# Lista zadań
Aplikacja jest projektem zaliczeniowym z przedmiotu "Aplikacje internetowe"

## Wykorzystane technologie

**Client**: React + Vite

**Server**: Express JS + MongoDB


## Opis działania aplikacji
Należy rozpocząć od założenia konta. Po pomyślnej rejestracji pojawi się pusta lista zadań.
Hasła w bazie danych są przechowywane w formie hashy obliczanych za pomocą algorytmu argon2id.
Czas sesji wynosi 15 minut. Gdy upłynie należy zalogować się ponownie.

Aplikacja umożliwia wyświetlanie, dodawanie, edytowanie i usuwanie zadań. 
Każdy użytkownik może pracować tylko na swoich zadaniach. Możliwe jest założenie wielu kont, każde z innymi zadaniami.

Struktura zadania: 

* **Nazwa** - pole obowiązkowe
* **Opis i data** - pola opcjonalne
* **user** - pole w celach autoryzacji, dodawane po stronie serwera

Aplikacja waliduje formularze po stronie klienta i serwera.

Po zakończeniu pracy należy się wylogować z aplikacji.