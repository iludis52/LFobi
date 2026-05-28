#pragma once
//#include <cstdarg>
namespace Eloquent {
    namespace ML {
        namespace Port {
            class DecisionTree {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        if (x[4] <= 20450.0) {
                            if (x[5] <= 4029.0) {
                                if (x[3] <= 595.0) {
                                    return 0;
                                }

                                else {
                                    if (x[0] <= 4514.0) {
                                        if (x[2] <= 4622.0) {
                                            return 4;
                                        }

                                        else {
                                            return 3;
                                        }
                                    }

                                    else {
                                        if (x[3] <= 3515.0) {
                                            return 5;
                                        }

                                        else {
                                            if (x[5] <= 2249.0) {
                                                return 4;
                                            }

                                            else {
                                                if (x[0] <= 13063.0) {
                                                    return 3;
                                                }

                                                else {
                                                    return 5;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            else {
                                if (x[1] <= 596.0) {
                                    return 1;
                                }

                                else {
                                    return 6;
                                }
                            }
                        }

                        else {
                            return 2;
                        }
                    }

                protected:
                };
            }
        }
    }