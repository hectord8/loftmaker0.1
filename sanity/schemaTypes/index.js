import { postType } from "./postType";
import gallery from "./gallery";
import project from "./project";
import review from "./review";
import accreditation from "./accreditation";
import companySettings from "./companySettings";

/**
 * project was written but never registered, which is why /projects had nothing
 * to read. The trust schemas back the Reviews, Accreditations and TrustDetails
 * components, all of which render nothing while their dataset is empty.
 */
export const schemaTypes = [
  postType,
  gallery,
  project,
  review,
  accreditation,
  companySettings,
];