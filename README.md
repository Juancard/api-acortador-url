# API: Servicio de Timestamp

## Historias de usuario:

1) Puedo pasar una URL como parametro y voy a recibir una URL acortado como respuesta JSON.

2) Cuando visite esa URL acortada, me redirigirá a mi link original.

## Ejemplo de uso en creación:

```url
https://acortador23.herokuapp.com/new/https://www.google.com

https://acortador23.herokuapp.com/new/http://blog.codinghorror.com/
```

## Ejemplo de salida en creación:

```json
{"url_original": "http://blog.codinghorror.com/", "url_corta": "https://acortador23.herokuapp.com/VkI4bCcjl"}
```

## Usar:

```url
https://acortador23.herokuapp.com/VkI4bCcjl
```

## Redirecciona a:

```url
http://blog.codinghorror.com/
```