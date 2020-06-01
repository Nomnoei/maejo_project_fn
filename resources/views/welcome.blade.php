<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="{{url('image/logo.png')}}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Laravel</title>
  <link rel="stylesheet" href="/css/app.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link href="css/app.css" rel="stylesheet">
    <link href="css/layout.css" rel="stylesheet">
    <link href="css/all.css" rel="stylesheet">
    <title></title>
  </head>
  {{-- style="background:#EFEFEF;" --}}
  <body style="background:#EFEFEF;" >
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    {{-- <script language="javascript" type="text/javascript" src="./dist/jspdf.customfonts.debug.js"></script> --}}
    {{-- <script language="javascript" type="text/javascript" src="defaultVFS.js"></script> --}}

    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <div id="app">
      {{-- {{ csrf_token() }} --}}
        <main-app :csrf='{!! json_encode(csrf_token()) !!}'></main-app>
    </div>
    <script type="text/javascript" src="js/app.js"></script>

  </body>
</html>
