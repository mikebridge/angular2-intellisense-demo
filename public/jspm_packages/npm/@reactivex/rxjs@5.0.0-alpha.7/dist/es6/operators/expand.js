/* */ 
"format cjs";
import { ExpandOperator } from './expand-support';
export default function expand(project, concurrent = Number.POSITIVE_INFINITY) {
    return this.lift(new ExpandOperator(project, concurrent));
}
//# sourceMappingURL=expand.js.map