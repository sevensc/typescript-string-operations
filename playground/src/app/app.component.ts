import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
  } as NgxMonacoEditorConfig;

  constructor(
    private http: HttpClient) {
  }

  private _code: string = '';

  get code(): string {
    return this._code;
  };

  set code(value: string) {
    this._code = value;
  }

  onInit($event): void {
    this.http
      .get('/assets/typescript-string-operations/dist/index.js', { responseType: 'text' })
      .subscribe(data => {
        window.monaco.languages.typescript
          .typescriptDefaults
          .addExtraLib(data);
      });
  }
}
