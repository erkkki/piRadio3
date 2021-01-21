import { Injectable } from '@angular/core';

import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsenseService {
  // <script data-ad-client="ca-pub-6138155049648690" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  private url = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  private clientId = 'ca-pub-6138155049648690';

  /**
   * Not much here yet.. Just delaying loading script because there is no use for it yet.
   */
  constructor() {
    const source = timer(5000);
    const subscribe = source.subscribe(() => {
      console.log('5s Timer end.');
      this.loadScript();
      subscribe.unsubscribe();
    });
  }

  loadScript(): void {
    const node = document.createElement('script') as HTMLScriptElement;
    node.src = this.url;
    node.setAttribute('data-ad-client', this.clientId);
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
