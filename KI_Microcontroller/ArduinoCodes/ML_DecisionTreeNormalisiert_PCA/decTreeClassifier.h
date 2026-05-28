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
                        if (x[0] <= 13859.41796875) {
                            if (x[1] <= -6355.33935546875) {
                                return 1;
                            }

                            else {
                                if (x[1] <= -644.2809600830078) {
                                    if (x[2] <= -2416.7130584716797) {
                                        return 0;
                                    }

                                    else {
                                        return 6;
                                    }
                                }

                                else {
                                    if (x[2] <= -3411.7471923828125) {
                                        return 3;
                                    }

                                    else {
                                        if (x[2] <= 4517.55615234375) {
                                            if (x[0] <= -9504.37548828125) {
                                                if (x[2] <= -203.45062255859375) {
                                                    if (x[0] <= -15672.39404296875) {
                                                        return 5;
                                                    }

                                                    else {
                                                        return 4;
                                                    }
                                                }

                                                else {
                                                    return 5;
                                                }
                                            }

                                            else {
                                                if (x[0] <= -453.21363067626953) {
                                                    return 4;
                                                }

                                                else {
                                                    if (x[2] <= 1460.0593872070312) {
                                                        return 3;
                                                    }

                                                    else {
                                                        return 4;
                                                    }
                                                }
                                            }
                                        }

                                        else {
                                            return 5;
                                        }
                                    }
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
