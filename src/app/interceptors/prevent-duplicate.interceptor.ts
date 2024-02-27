import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, every, finalize, of, shareReplay, tap } from 'rxjs';

// Crea una mappa queue per gestire le richieste in coda,
// crea una mappa cache per memorizzare le risposte HTTP in cache.
const queue: Map<string, Observable<HttpEvent<any>>> = new Map();
const cache: Map<string, HttpEvent<any>> = new Map();

/**
 * Interceptor to prevent duplicate HTTP requests for GET methods.
 * It checks if the request is already queued or if the response is cached.
 * If the request is queued, it returns the queued request.
 * If the response is cached, it returns the cached response.
 * Otherwise, it sends the request, caches the response, and removes the request from the queue.
 * @param req - The HTTP request.
 * @param next - The next HTTP handler.
 * @returns An observable of the HTTP event.
 */


// Definisco la funzione preventDuplicateRequests.
// Prende in input la richiesta HTTP e il gestore successivo.
export const preventDuplicateRequests: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Controlla se il metodo della RICHIESTA è diverso da 'GET'.
  // In tal caso, passa semplicemente la richiesta al gestore successivo.
  if (req.method !== 'GET') {
    return next(req);
  }

  // Controlla se esiste già una RICHIESTA in coda per la stessa URL.
  // Se esiste, restituisce la richiesta in coda anziché inviare una nuova richiesta
  const queuedRequest = queue.get(req.url);
  if (queuedRequest) {
    return queuedRequest;
  }

  // Controlla se esiste già una RISPOSTA memorizzata in cache per la stessa URL.
  // Se esiste, restituisce la risposta memorizzata anziché inviare una nuova richiesta.
  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse);
  }
  
  /** 
  * Se la richiesta non è in coda e non esiste una risposta in cache.
  */

  // Invia la richiesta al gestore successivo.
  const sharedRequest = next(req).pipe(
    // Arriva la risposta, la memorizza nella cache
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, event.clone());
      }
    }),
    // Rimuove la richiesta dalla coda
    finalize(() => queue.delete(req.url)),
    // Utilizza shareReplay per condividere la risposta tra gli observers
    // e finalize per garantire che la richiesta venga rimossa dalla coda una volta completata.
    shareReplay()
  );

  queue.set(req.url, sharedRequest);

  return sharedRequest;
};
