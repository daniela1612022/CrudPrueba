import { provideFirebaseApp , initializeApp } from '@angular/fire/app';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { enviroment } from './enviroments/enviroment';
import { getFirestore , provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers : [
    provideRouter(appRoutes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(enviroment.firebase)),
      provideFirestore(() => getFirestore())
      ),
  ],
}).catch((err) => console.log(err));
