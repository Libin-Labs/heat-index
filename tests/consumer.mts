import { rothfuszF } from '@lp-labs/heat-index';
if (Math.abs(rothfuszF(90, 70) - 105.9220206) > 0.00001) throw new Error('Regression');
// @ts-expect-error invalid argument must be rejected by declarations
rothfuszF(90, '70');
