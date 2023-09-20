import { createContext } from 'react';

import { GetFeatureDto } from 'types/feature/GetFeatureDto';

export const FeatureContext = createContext<GetFeatureDto[]>([]);
