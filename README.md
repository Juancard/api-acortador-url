# API: Servicio de Timestamp

## Historias de usuario:

1) Puedo pasar una URL como parametro y voy a recibir una URL acortado como respuesta JSON.

2) Cuando visite esa URL acortada, me redirigirá a mi link original.

## Ejemplo de uso en creación:

```url
https://acortador23.herokuapp.com/new/https://www.google.com

https://acortador23.herokuapp.com/new/http://freecodecamp.com/news
```
Si por alguna razón quisieras pasar un sitio que no existe (o una url invalida) puedes hacer:
```url
https://acortador23.herokuapp.com/new/invalid?allow=true
```

## Ejemplo de salida en creación:

```json
{"url_original": "http://freecodecamp.com/news", "url_corta": "https://acortador23.herokuapp.com/4"}
```

## Usar:

```url
https://acortador23.herokuapp.com/4
```

## Redirecciona a:

```url
http://freecodecamp.com/news
```