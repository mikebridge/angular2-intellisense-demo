/* */ 
"format cjs";
import { AsyncPipe } from './pipes/async_pipe';
import { UpperCasePipe } from './pipes/uppercase_pipe';
import { LowerCasePipe } from './pipes/lowercase_pipe';
import { JsonPipe } from './pipes/json_pipe';
import { SlicePipe } from './pipes/slice_pipe';
import { DatePipe } from './pipes/date_pipe';
import { DecimalPipe, PercentPipe, CurrencyPipe } from './pipes/number_pipe';
import { CONST_EXPR } from 'angular2/src/facade/lang';
export { AsyncPipe } from './pipes/async_pipe';
export { DatePipe } from './pipes/date_pipe';
export { JsonPipe } from './pipes/json_pipe';
export { SlicePipe } from './pipes/slice_pipe';
export { LowerCasePipe } from './pipes/lowercase_pipe';
export { NumberPipe, DecimalPipe, PercentPipe, CurrencyPipe } from './pipes/number_pipe';
export { UpperCasePipe } from './pipes/uppercase_pipe';
export const COMMON_PIPES = CONST_EXPR([
    AsyncPipe,
    UpperCasePipe,
    LowerCasePipe,
    JsonPipe,
    SlicePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    DatePipe
]);
