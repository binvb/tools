import DefaultRoutes from './defaultRouter'
import BusinessRoutes from './business'

export interface RouteOption {
  path: string;
  component?: JSX.Element,
  children?: RouteOption[]
}

export default DefaultRoutes.concat(BusinessRoutes)