#pragma once
#include <cstdarg>
namespace Eloquent {
    namespace ML {
        namespace Port {
            class RandomForest {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        uint8_t votes[5] = { 0 };
                        // tree #1
                        if (x[3] <= 4192.5) {
                            if (x[0] <= 3090.5) {
                                if (x[5] <= 1058.5) {
                                    votes[3] += 1;
                                }

                                else {
                                    if (x[3] <= 1443.0) {
                                        votes[1] += 1;
                                    }

                                    else {
                                        if (x[0] <= 1857.5) {
                                            votes[0] += 1;
                                        }

                                        else {
                                            votes[3] += 1;
                                        }
                                    }
                                }
                            }

                            else {
                                votes[2] += 1;
                            }
                        }

                        else {
                            votes[4] += 1;
                        }

                        // tree #2
                        if (x[5] <= 1889.5) {
                            if (x[0] <= 2583.0) {
                                if (x[5] <= 1028.0) {
                                    votes[3] += 1;
                                }

                                else {
                                    votes[0] += 1;
                                }
                            }

                            else {
                                votes[2] += 1;
                            }
                        }

                        else {
                            if (x[4] <= 4358.5) {
                                if (x[4] <= 1350.5) {
                                    votes[3] += 1;
                                }

                                else {
                                    votes[1] += 1;
                                }
                            }

                            else {
                                votes[4] += 1;
                            }
                        }

                        // tree #3
                        if (x[5] <= 1028.0) {
                            if (x[0] <= 2643.5) {
                                votes[3] += 1;
                            }

                            else {
                                votes[2] += 1;
                            }
                        }

                        else {
                            if (x[5] <= 1804.0) {
                                votes[0] += 1;
                            }

                            else {
                                if (x[3] <= 4083.0) {
                                    votes[1] += 1;
                                }

                                else {
                                    if (x[3] <= 4839.0) {
                                        votes[3] += 1;
                                    }

                                    else {
                                        votes[4] += 1;
                                    }
                                }
                            }
                        }

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
                };
            }
        }
    }