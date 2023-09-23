# Feature flag implementation in Nest.js

Since the advent of the agile method in web development, it is very common to want to deploy new features and to develop new ones at the same time. But how to reconcile deployment and delivery as efficiently as possible? Feature flags are one easy way to solve this problem.

See full article [here]()

## Installation

The monorepo was created via [Bifrost](https://github.com/theodo-group/bifrost). Bifrost is a monorepo starter for fullstack application using Next.js and Nest.js.

Follow the [installation](./docs/installation.md) docs

## The goal

We have a basic application with an unfinished new feature. The goal is to add a feature flag system that allows to hide or show the new feature on the fly. Here are some steps to follow :

- Define feature entity definition
- Generate and run a migration to create a feature database table that will store features data
- Enable administration of the feature table directly on Admin.js
- Create an api feature endpoint on backend to send all features data
- Fetch the feature via a front end api client
- Create a feature flag via Admin.js for the new feature
- Condition the code with the activation status of the feature flag

## implementation

All the implementation code is available on the `feat/add-feature-flag-backend-system`.

### 1. Define the feature entity

Each feature flag should have a name that reference the feature and an activation status true or false.

Let's create a Nest.js new module to handle all the future feature flag logic in the backend. Add a `feature.entity.ts` file in the new feature module that will define the type of each feature key.

_src/modules/feature/feature.entity.ts:_

```typescript
import BaseEntity from '@helpers/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('features')
export class Feature extends BaseEntity {
  @Column({ length: 50 })
  name!: string;

  @Column()
  isActive!: boolean;
}
```

### 2. Generate and run the migration

Type ORM automatically detected the `feature.entity.ts`.

When running `pnpm migration:generate` Type ORM will detect that the feature entity is not in the database and will generate a migration to run to create it in database.

Run the new generated migration with `pnpm migration:run` to create the feature table in data base.

You can enter the database through the docker container to verify features table presence by running the following commands:

```
docker exec -it backend-db-1 sh
psql -U nestjs api
\dt
```

You should get the following output:

```
          List of relations
 Schema |    Name    | Type  | Owner
--------+------------+-------+--------
 public | features   | table | nestjs
 public | migrations | table | nestjs
 public | session    | table | nestjs
 public | users      | table | nestjs
(4 rows)
```

### 3. Show feature table in Admin.js

It's not very convenient to do severals commands to administrate tables and data. That is why Admin.js exist, to create and modify table records on the fly.

To do so let's define the feature module.

_src/modules/feature/feature.module.ts:_

```typescript
import { AdminResourceModule } from '@adminjs/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Feature } from './feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feature]),
    AdminResourceModule.forFeature([Feature]),
  ],
})
export class FeatureModule {}
```

Don't forget to add it in `app.module.ts` imports list.

The `AdminResourceModule` allows us to manage our feature table directly on Admin.js on http://localhost:8000/admin.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gf7bway8pbernmin0vel.png)

### 4. Create an api endpoint to get features data

We simply need to floow the Nest.js standard and create a feature controller, a feature service and reference them in the feature module.

The feature service is fetching all data from the feature repository with `await this.featureRepository.find()`.
_src/modules/feature/feature.service.ts:_

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feature } from './feature.entity';
import GetFeatureDto from './interfaces/GetFeatureDto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  getAll = async (): Promise<GetFeatureDto[]> => {
    return await this.featureRepository.find();
  };
}
```

The feature controller defines a `GET` api route accessible under `/features`.
_src/modules/feature/feature.controller.ts:_

```typescript
import { Controller } from '@decorators/controller';
import { Get } from '@decorators/httpDecorators';

import { FeatureService } from './feature.service';
import GetFeatureDto from './interfaces/GetFeatureDto';

@Controller('features')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get({ isPublic: true })
  getAll(): Promise<GetFeatureDto[]> {
    return this.featureService.getAll();
  }
}
```

It is mandatory to reference the feature service and controller in the feature module to make them part of the application.
_src/modules/feature/feature.module.ts:_

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([Feature]),
    AdminResourceModule.forFeature([Feature])
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
})
```

_src/modules/feature/interfaces/GetFeatureDto.ts:_

```typescript
export default class GetFeatureDto {
  readonly name!: string;
  readonly isActive!: boolean;
}
```

### 5. Create a feature api client

Retrieving all feature flags in the frontend is contingent upon your specific frontend architecture. To gain insights into the implementation process, you can explore the dedicated GitHub repository, particularly if you're working within the Next.js framework. The repository provides a practical example and guidance on how to accomplish this task effectively in the context of your project.

### 6. The feature flag

Here it comes! It's finaly time to create the feature flag. Let's go to Admin.js and create a new record in the feature table.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5urrcdbdqxcsfeap9d15.png)

### 7. Code conditioning

To integrate the new feature seamlessly into our application, we must introduce conditional rendering logic into our codebase. This involves configuring the application to display or hide the feature, which in this case, comprises a button leading to the feature page. As part of this process, we'll need to implement conditional logic at two key junctures within the codebase to ensure the feature functions as intended.

First we need to hide the `New feature in progress` button:

```typescript
export const Home = (): JSX.Element => {
  const isNewFeatureActive = useIsFeatureActive('NEW_FEATURE');

  return (
    <ContentBoxLayout>
      <div className={style.div}>
        <h1 className={style.title}>The HOME page</h1>
        {isNewFeatureActive && (
          <Link className={style.button} href={Pages.NewFeature}>
            <p className={style.p}>New Feature in progress</p>
          </Link>
        )}
      </div>
    </ContentBoxLayout>
  );
};
```

Please note that the value passed to `useIsFeatureActive` should be the same as the feature name in Admin.js.

Lastly, our task involves concealing the `/new-feature` page. Even though it's inaccessible via the button because hidden by the feature page, the page remains reachable through its direct URL.

```typescript
const NewFeaturePage = () => {
  const isNewFeatureActive = useIsFeatureActive('NEW_FEATURE');

  if (!isNewFeatureActive) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <HeaderBarLayout>
      <NewFeature />
    </HeaderBarLayout>
  );
};
```

Now, with the capability to toggle the new feature directly in Admin.js, we have the flexibility to control whether the new feature is displayed or not. This functionality empowers us to develop additional features, each with its own feature flag, and effectively manage them in various environments.
