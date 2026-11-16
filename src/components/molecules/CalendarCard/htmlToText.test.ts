import { describe, expect, it } from 'vitest';

import { containsHtml, htmlToText } from './htmlToText';

describe('htmlToText', () => {
  it('leaves plain text alone apart from collapsing whitespace', () => {
    expect(htmlToText('Neem  zwemspullen\nmee')).toBe('Neem zwemspullen mee');
    expect(htmlToText('3 < 5 en 7 > 2')).toBe('3 < 5 en 7 > 2');
  });

  it('strips tags and keeps the words apart', () => {
    expect(htmlToText('<p>Eerste <b>regel</b></p><p>Tweede<br>derde</p>')).toBe(
      'Eerste regel Tweede derde'
    );
  });

  it('decodes entities', () => {
    expect(htmlToText('<span>Jan &amp; Piet</span>')).toBe('Jan & Piet');
  });

  it('drops scripts and styles entirely', () => {
    expect(htmlToText('<style>p{}</style>Hallo<script>alert(1)</script>')).toBe(
      'Hallo'
    );
  });
});

describe('containsHtml', () => {
  it('recognises tags but not loose angle brackets', () => {
    expect(containsHtml('<br>')).toBe(true);
    expect(containsHtml('a <b>c</b>')).toBe(true);
    expect(containsHtml('3 < 5')).toBe(false);
  });
});
