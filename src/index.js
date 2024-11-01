import { v4 as uuidv4 } from "uuid";
import { InitOptions } from "./entities/InitOptions.js";
import { InstanceId } from "./entities/InstanceId.js";
import { createActionPatterns } from "./helpers.js";

function initSagaQuery({ domain, staleTime }) {
  var options = InitOptions.from({ domain, staleTime });

  var actionPatterns = createActionPatterns(() =>
    InstanceId.from(uuidv4),
  )(options.domain);

  console.log(actionPatterns);
}

export { initSagaQuery };
