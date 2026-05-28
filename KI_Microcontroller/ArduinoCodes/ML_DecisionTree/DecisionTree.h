namespace Eloquent {
    namespace ML {
        namespace Port {
            class DecisionTree {
                public:
                    /**
                    * Predict class for features vector
                    */
                    int predict(float *x) {
                        if (x[0] <= 3157.5) {
                            if (x[3] <= 4839.0) {
                                if (x[1] <= 1162.5) {
                                    if (x[1] <= 930.0) {
                                        return 1;
                                    }

                                    else {
                                        return 0;
                                    }
                                }

                                else {
                                    if (x[5] <= 3307.0) {
                                        return 3;
                                    }

                                    else {
                                        return 1;
                                    }
                                }
                            }

                            else {
                                return 4;
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
