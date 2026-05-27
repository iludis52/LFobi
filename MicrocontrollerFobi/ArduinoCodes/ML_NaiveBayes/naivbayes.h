namespace Eloquent {
    namespace ML {
        namespace Port {
            class GaussianNB {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        float votes[5] = { 0.0f };
                        float theta[6] = { 0 };
                        float sigma[6] = { 0 };
                        theta[0] = 6371.0; theta[1] = 2986.25; theta[2] = 3507.25; theta[3] = 2380.0; theta[4] = 2166.375; theta[5] = 669.625;
                        sigma[0] = 2760381.18887281; sigma[1] = 768779.87637281; sigma[2] = 782384.12637281; sigma[3] = 1146269.68887281; sigma[4] = 479796.17324781; sigma[5] = 107508.17324780999;
                        votes[0] = 0.205128205128 - gauss(x, theta, sigma);
                        theta[0] = 1053.5; theta[1] = 1989.5; theta[2] = 3298.166666666666; theta[3] = 2539.833333333334; theta[4] = 1908.833333333333; theta[5] = 873.333333333333;
                        sigma[0] = 91222.27220614332; sigma[1] = 187784.60553947664; sigma[2] = 425189.4944283655; sigma[3] = 740929.4944283655; sigma[4] = 518972.1610950322; sigma[5] = 635733.5777616989;
                        votes[1] = 0.153846153846 - gauss(x, theta, sigma);
                        theta[0] = 1650.25; theta[1] = 853.5; theta[2] = 1799.875; theta[3] = 1795.5; theta[4] = 2690.75; theta[5] = 2985.75;
                        sigma[0] = 278722.12637281; sigma[1] = 109388.18887280999; sigma[2] = 527128.04824781; sigma[3] = 681562.93887281; sigma[4] = 1239227.37637281; sigma[5] = 321237.62637281;
                        votes[2] = 0.205128205128 - gauss(x, theta, sigma);
                        theta[0] = 1156.0; theta[1] = 941.75; theta[2] = 1752.125; theta[3] = 1574.25; theta[4] = 2068.625; theta[5] = 1264.375;
                        sigma[0] = 2.188872809993; sigma[1] = 2.126372809993; sigma[2] = 2.048247809993; sigma[3] = 2.376372809993; sigma[4] = 2.173247809993; sigma[5] = 2.673247809993;
                        votes[3] = 0.205128205128 - gauss(x, theta, sigma);
                        theta[0] = 1479.0; theta[1] = 2125.666666666666; theta[2] = 7836.777777777777; theta[3] = 9216.111111111111; theta[4] = 10368.444444444445; theta[5] = 4954.888888888889;
                        sigma[0] = 274752.3555394767; sigma[1] = 415923.46665058774; sigma[2] = 7228549.861712316; sigma[3] = 7026351.787638242; sigma[4] = 20059725.269119725; sigma[5] = 3060909.120971576;
                        votes[4] = 0.230769230769 - gauss(x, theta, sigma);
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
                    * Compute gaussian value
                    */
                    float gauss(float *x, float *theta, float *sigma) {
                        float gauss = 0.0f;

                        for (uint16_t i = 0; i < 6; i++) {
                            gauss += log(sigma[i]);
                            gauss += abs(x[i] - theta[i]) / sigma[i];
                        }

                        return gauss;
                    }
                };
            }
        }
    }
