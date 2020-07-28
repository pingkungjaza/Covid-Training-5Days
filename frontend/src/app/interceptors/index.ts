import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "./header.interceptor";
import { MainInterceptor } from "./main.interceptor";


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true }, // for register
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: Header3Interceptor, multi: true },
  ]
  
  