import {clinicalDataProvider} from "../integrations/clinical-data-provider";

/** Compatibility export for the existing readiness checks. */
export const clinicalIntakeProvider = {
  name: clinicalDataProvider.name,
  enabled: false,
  mode: clinicalDataProvider.mode,
  beginClinicalIntake: clinicalDataProvider.beginClinicalIntake.bind(clinicalDataProvider),
};
