//#override imports
import { requestHandler } from "./util.js";

import type { PluginHandler } from "../next-types.js";
import type { IncomingMessage } from "../request.js";
import type { ServerResponse } from "../response.js";
//#endOverride

//#override handler
export const handler: PluginHandler = async (req: IncomingMessage, res: ServerResponse) => {
  return requestHandler(req, res);
};
//#endOverride
