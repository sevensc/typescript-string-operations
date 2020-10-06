import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MonacoEditorModule, NgxMonacoEditorConfig, NgxEditorModel } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';

const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: { 
    scrollBeyondLastLine: false,

  }, // pass default options to be used
  onMonacoLoad: () => {
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
