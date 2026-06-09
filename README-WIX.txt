══════════════════════════════════════════════════════════════════════════
  MARCO STORZ · COACHING + CONSULTING — WIX-ÜBERGABEPAKET
══════════════════════════════════════════════════════════════════════════

INHALT
------
  index.html ............... Startseite
  leistungen.html .......... Leistungen (inkl. FAQ + FAQ-Schema)
  fachbereiche.html ........ Fachbereiche
  portrait.html ............ Portrait
  referenzen.html .......... Referenzen / Kundenstimmen
  kontakt.html ............. Kontakt (Formular- + Buchungs-Embed-Platzhalter)
  impressum.html / datenschutz.html ... Rechtsseiten (noindex)
  styles.css ............... gesamtes Design (Farben, Typo, Responsive)
  site.js .................. Navigation, Hero-Slider, Reveal-Animationen
  assets/ .................. alle Bilder & Logos (lokal)
  _Anleitung-Website-Audit.html ... Premium-Audit & Optimierungs-Roadmap
  _Anleitung-WIX-Umsetzung.html ... Schritt-für-Schritt Go-Live (WIX/HubSpot/Outlook)

WICHTIG — SO WIRD DIESES PAKET IN WIX GENUTZT
---------------------------------------------
WIX importiert keine fertige HTML-Website 1:1 in den Editor. Dieses Paket ist
die vollständige, finale BLAUPAUSE zum Nachbau in WIX STUDIO (responsive-first):

  • Farben:  Dunkelblau #1E3140 · Petrol #4A7A95 · Grau #8E9B9C · Off-White #F6F6F4
  • Schrift: „Jost" (Google Fonts) — als Haupt-Font in WIX setzen
  • Struktur, Texte, Bildzuordnung, SEO-Titel/Meta: 1:1 aus den Dateien übernehmen
  • Bilder aus assets/ in den WIX-Media-Manager laden und mit Alt-Text versehen
  • JSON-LD (im <head> jeder Datei) via WIX → Einstellungen → Custom Code übernehmen

EMBED-CODES (bereits als Platzhalter/Kommentar in kontakt.html hinterlegt)
--------------------------------------------------------------------------
1) TERMINBUCHUNG — HubSpot Meetings, mit Outlook synchronisiert
   (WIX → Einbetten → HTML; DEIN-SLUG ersetzen)

   <div class="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/DEIN-SLUG?embed=true"></div>
   <script src="https://static.hsappstatic.net/MeetingsEmbedCode/static-1.1/MeetingsEmbedCode.js"></script>

2) KONTAKTFORMULAR — zwei Wege
   A) Natives WIX-Formular (Felder wie in kontakt.html) + WIX-Automation
      „Bei Absendung → HubSpot-Kontakt erstellen/aktualisieren".
   B) HubSpot-Formular direkt einbetten (WIX → Einbetten → HTML):

      <script charset="utf-8" src="https://js-eu1.hsforms.net/forms/embed/v2.js"></script>
      <script>hbspt.forms.create({portalId:"DEINE-PORTAL-ID",formId:"DEINE-FORM-ID",region:"eu1"});</script>

REIHENFOLGE
-----------
  1. WIX-Studio-Projekt + Domain   2. Design/Inhalte nachbauen
  3. HubSpot-App + Formular-Sync   4. HubSpot Meetings ↔ Outlook + Embed
  5. Responsive je Breakpoint      6. DSG/DSGVO, Tests, Go-Live

Details Schritt für Schritt: _Anleitung-WIX-Umsetzung.html
══════════════════════════════════════════════════════════════════════════
