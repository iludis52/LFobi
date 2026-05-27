#pragma once
#include <cstdarg>
namespace Eloquent {
    namespace ML {
        namespace Port {
            class LogisticRegression {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        float votes[5] = { 7.2346949e-05 ,-3.8087507e-05 ,-6.623918e-06 ,6.438605e-06 ,-3.4074129e-05  };
                        votes[0] += dot(x,   0.004379886324  , 0.004997815641  , 5.2783052e-05  , -0.009760032175  , 0.00793275693  , 0.00050353607 );
                        votes[1] += dot(x,   0.001600640777  , -0.01247178229  , -0.013672789351  , 0.000175445631  , 0.001805815331  , 0.023081905277 );
                        votes[2] += dot(x,   0.011751158652  , 0.000742870013  , 0.002880564217  , -0.001199739646  , -0.004625964885  , -0.00830102761 );
                        votes[3] += dot(x,   -0.012702999773  , 0.016103835815  , 0.012379575011  , -0.006693149088  , -0.007072365411  , 0.001664274858 );
                        votes[4] += dot(x,   -0.00502868598  , -0.009372739179  , -0.00164013293  , 0.017477475278  , 0.001959758035  , -0.016948688595 );
                        // return argmax of votes
                        uint8_t classIdx = 0;
                        float maxVotes = votes[0];

                        for (uint8_t i = 1; i < 5; i++) {
                            if (votes[i] > maxVotes) {
                                classIdx = i;
                                maxVotes = votes[i];
                            }
                        }

                        return classIdx;
                    }

                protected:
                    /**
                    * Compute dot product
                    */
                    float dot(float *x, ...) {
                        va_list w;
                        va_start(w, 6);
                        float dot = 0.0;

                        for (uint16_t i = 0; i < 6; i++) {
                            const float wi = va_arg(w, double);
                            dot += x[i] * wi;
                        }

                        return dot;
                    }
                };
            }
        }
    }