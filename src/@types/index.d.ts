import { IncomingHttpHeaders } from "http";

/**
 * Como o TS, por padrão, não reconhece a propriedade authorization no objeto req.headers,
 * que é do tipo `IncomingHttpHeaders` precisei tipar por aqui.
 */
declare module "http" {
  interface IncomingHttpHeaders {
    authorization?: string;
  }
}
