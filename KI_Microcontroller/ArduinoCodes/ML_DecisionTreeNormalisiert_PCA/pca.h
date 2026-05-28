#pragma once
//#include <cstdarg>
namespace Eloquent {
    namespace ML {
        namespace Port {
            class PCA {
                public:
                    /**
                    * Apply dimensionality reduction
                    * @warn Will override the source vector if no dest provided!
                    */
                    void transform(float *x, float *dest = NULL) {
                        static float u[3] = { 0 };
                        u[0] = dot(x,   -0.007932626912  , 0.065852262887  , 0.519823061712  , 0.550318194613  , 0.616615141902  , 0.20571871298 );
                        u[1] = dot(x,   0.564550574074  , 0.377641945641  , 0.380182259502  , 0.20474872267  , -0.385875260134  , -0.450897886386 );
                        u[2] = dot(x,   0.761773910157  , 0.096419108045  , -0.300748731841  , -0.203691962438  , 0.287121844799  , 0.442746763264 );
                        memcpy(dest != NULL ? dest : x, u, sizeof(float) * 3);
                    }

                protected:
                    /**
                    * Compute dot product with varargs
                    */
                    float dot(float *x, ...) {
                        va_list w;
                        va_start(w, 6);
                        static float mean[] = {  4339.990825688074 , 3248.155963302752 , 9866.119266055046 , 8000.577981651376 , 11456.715596330276 , 5209.211009174312  };
                        float dot = 0.0;

                        for (uint16_t i = 0; i < 6; i++) {
                            dot += (x[i] - mean[i]) * va_arg(w, double);
                        }

                        return dot;
                    }
                };
            }
        }
    }