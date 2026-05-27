#pragma once
#include <cstdarg>
namespace Eloquent {
    namespace ML {
        namespace Port {
            class SVM {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        float kernels[20] = { 0 };
                        float decisions[10] = { 0 };
                        int votes[5] = { 0 };
                        kernels[0] = compute_kernel(x,   1155.0  , 941.0  , 1752.0  , 1574.0  , 2068.0  , 1265.0 );
                        kernels[1] = compute_kernel(x,   1156.0  , 943.0  , 1753.0  , 1576.0  , 2070.0  , 1266.0 );
                        kernels[2] = compute_kernel(x,   1157.0  , 941.0  , 1753.0  , 1574.0  , 2069.0  , 1264.0 );
                        kernels[3] = compute_kernel(x,   1156.0  , 943.0  , 1753.0  , 1575.0  , 2071.0  , 1265.0 );
                        kernels[4] = compute_kernel(x,   2813.0  , 1689.0  , 3606.0  , 3894.0  , 5073.0  , 3980.0 );
                        kernels[5] = compute_kernel(x,   2178.0  , 914.0  , 1447.0  , 1719.0  , 2025.0  , 2405.0 );
                        kernels[6] = compute_kernel(x,   1349.0  , 663.0  , 1644.0  , 1892.0  , 1851.0  , 2565.0 );
                        kernels[7] = compute_kernel(x,   1193.0  , 573.0  , 1326.0  , 1223.0  , 1703.0  , 2342.0 );
                        kernels[8] = compute_kernel(x,   3513.0  , 1968.0  , 2001.0  , 1216.0  , 1307.0  , 525.0 );
                        kernels[9] = compute_kernel(x,   3502.0  , 1741.0  , 1330.0  , 1500.0  , 771.0  , 580.0 );
                        kernels[10] = compute_kernel(x,   3809.0  , 1915.0  , 4270.0  , 2974.0  , 3050.0  , 726.0 );
                        kernels[11] = compute_kernel(x,   1206.0  , 2229.0  , 3356.0  , 4272.0  , 3322.0  , 2634.0 );
                        kernels[12] = compute_kernel(x,   735.0  , 2518.0  , 1500.0  , 1248.0  , 966.0  , 854.0 );
                        kernels[13] = compute_kernel(x,   1451.0  , 1815.0  , 4783.0  , 1955.0  , 3249.0  , 434.0 );
                        kernels[14] = compute_kernel(x,   2558.0  , 5382.0  , 2274.0  , 2344.0  , 1100.0  , 2405.0 );
                        kernels[15] = compute_kernel(x,   690.0  , 1704.0  , 1933.0  , 1412.0  , 970.0  , 450.0 );
                        kernels[16] = compute_kernel(x,   900.0  , 1382.0  , 2556.0  , 1948.0  , 1603.0  , 476.0 );
                        kernels[17] = compute_kernel(x,   1664.0  , 2611.0  , 2620.0  , 2185.0  , 1881.0  , 793.0 );
                        kernels[18] = compute_kernel(x,   1901.0  , 3471.0  , 6188.0  , 7418.0  , 4757.0  , 2740.0 );
                        kernels[19] = compute_kernel(x,   1588.0  , 1578.0  , 4174.0  , 5406.0  , 5902.0  , 3111.0 );
                        decisions[0] = 1.19433623668
                        + kernels[0] * 1.231561e-06
                        + kernels[4] * -4.5048e-08
                        + kernels[5] * -1.59441e-07
                        + kernels[7] * -1.027073e-06
                        ;
                        decisions[1] = 1.477083455528
                        + kernels[2] * 2.60653e-07
                        + kernels[8] * -6.6501e-08
                        + kernels[9] * -1.48377e-07
                        + kernels[10] * -4.5775e-08
                        ;
                        decisions[2] = 1.446065771335
                        + kernels[1] * 1.170532e-06
                        + kernels[11] * -1.41353e-07
                        + kernels[12] * -4.293e-08
                        + kernels[15] * -4.2458e-07
                        + kernels[16] * -5.61669e-07
                        ;
                        decisions[3] = 2.104012411938
                        + kernels[3] * 5.1005e-08
                        + kernels[19] * -5.1005e-08
                        ;
                        decisions[4] = 0.611326962293
                        + kernels[5] * 2.96114e-07
                        + kernels[9] * -2.36716e-07
                        + kernels[10] * -5.9398e-08
                        ;
                        decisions[5] = 0.327163066265
                        + kernels[4] * 1.56977e-07
                        + kernels[6] * 3.32353e-07
                        + kernels[11] * -3.25835e-07
                        + kernels[12] * -5.419e-09
                        + kernels[15] * -1.58075e-07
                        ;
                        decisions[6] = 2.814999879339
                        + kernels[4] * 3.59446e-07
                        + kernels[19] * -3.59446e-07
                        ;
                        decisions[7] = -1.463398322368
                        + kernels[8] * 2.76966e-07
                        + kernels[10] * 1.80549e-07
                        + kernels[13] * -6.237e-08
                        + kernels[14] * -1.644e-09
                        + kernels[17] * -3.93501e-07
                        ;
                        decisions[8] = 1.733436034096
                        + kernels[10] * 8.0824e-08
                        + kernels[18] * -4.786e-09
                        + kernels[19] * -7.6038e-08
                        ;
                        decisions[9] = 4.569726056703
                        + kernels[11] * 2.1267e-07
                        + kernels[18] * -5.058e-09
                        + kernels[19] * -2.07612e-07
                        ;
                        votes[decisions[0] > 0 ? 0 : 1] += 1;
                        votes[decisions[1] > 0 ? 0 : 2] += 1;
                        votes[decisions[2] > 0 ? 0 : 3] += 1;
                        votes[decisions[3] > 0 ? 0 : 4] += 1;
                        votes[decisions[4] > 0 ? 1 : 2] += 1;
                        votes[decisions[5] > 0 ? 1 : 3] += 1;
                        votes[decisions[6] > 0 ? 1 : 4] += 1;
                        votes[decisions[7] > 0 ? 2 : 3] += 1;
                        votes[decisions[8] > 0 ? 2 : 4] += 1;
                        votes[decisions[9] > 0 ? 3 : 4] += 1;
                        int val = votes[0];
                        int idx = 0;

                        for (int i = 1; i < 5; i++) {
                            if (votes[i] > val) {
                                val = votes[i];
                                idx = i;
                            }
                        }

                        return idx;
                    }

                protected:
                    /**
                    * Compute kernel between feature vector and support vector.
                    * Kernel type: linear
                    */
                    float compute_kernel(float *x, ...) {
                        va_list w;
                        va_start(w, 6);
                        float kernel = 0.0;

                        for (uint16_t i = 0; i < 6; i++) {
                            kernel += x[i] * va_arg(w, double);
                        }

                        return kernel;
                    }
                };
            }
        }
    }