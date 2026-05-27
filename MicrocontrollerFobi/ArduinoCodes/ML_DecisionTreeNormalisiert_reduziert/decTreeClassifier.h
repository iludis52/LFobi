#pragma once
namespace Eloquent {
    namespace ML {
        namespace Port {
            class DecisionTree {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        if (x[4] <= 0.39509403705596924) {
                            if (x[5] <= 0.20193792134523392) {
                                if (x[0] <= 0.013496338704499067) {
                                    return 0;
                                }

                                else {
                                    if (x[0] <= 0.2612721621990204) {
                                        if (x[2] <= 0.08831248804926872) {
                                            return 4;
                                        }

                                        else {
                                            return 3;
                                        }
                                    }

                                    else {
                                        if (x[3] <= 0.06216689385473728) {
                                            return 5;
                                        }

                                        else {
                                            if (x[5] <= 0.10717137902975082) {
                                                return 4;
                                            }

                                            else {
                                                if (x[0] <= 0.7786721587181091) {
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
                                if (x[1] <= 0.031434690579771996) {
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