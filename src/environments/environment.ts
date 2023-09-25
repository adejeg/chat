// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
};

export const baseUrl = {
  jwt_token: 'HRHMX_ACCESS',
  refresh_token: 'HRHMX_REFRESH',
  server: 'http://localhost:3000/',
  // server: 'https://chat-dot-philip-campaign.uc.r.appspot.com/',
  login: 'login',
  analytics: 'analytics',
  employee_record: 'employees',
  transfer: 'transfers',
  leave: 'leaves',
  lga: 'lgas?filter[state_id]=18',
  states: 'states',
  management_status: 'statuses',
  cadres: 'cadres',
  departments: 'departments',
  employment_statuses: 'employment-statuses',
  qualifications: 'qualifications',
  banks: 'banks',
  dutystations: 'dutystations',
  refresh: 'token/refresh/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
