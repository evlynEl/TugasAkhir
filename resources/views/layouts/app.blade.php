<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- CSRF Token -->

    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="17x15">
    <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title>
    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.1.0.js') }}" loading=lazy></script>



    <script src="{{ asset('js/app.js') }}"></script>
    <!-- <script src="//code.jquery.com/jquery-1.11.0.min.js"></script> -->
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>

    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
    @guest
    @else
        <script src="{{ asset('js/RDZ.js') }}"></script>
    @endguest
</head>
@guest

    <body>
    @else

        <body onload="Greeting()">
        @endguest
        <div id="app">
            <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
                <div class="container col-md-12">
                    <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                        <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                    @guest
                    @else
                        <div class="NameAndroid RDZNavBrandCenter" style="display:none;padding-top: 5px;">
                            <p style="font-size: 15px;display: block;margin-bottom: 0px;text-align:center"><label
                                    id="greeting"></label>, {{ Auth::user()->NamaUser }}</p>
                        </div>
                        <br>
                        <button class="navbar-toggler RDZNavBrandCenter" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    @endguest

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        @guest
                        @else
                        @endguest
                        <!-- Right Side Of Navbar -->

                        <!-- Authentication Links -->
                        @guest
                        @else
                            <ul class="navbar-nav ml-auto">
                                {{-- <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->NamaUser }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li> --}}
                                <div style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;"
                                    class="NameWindows">
                                    <p style="font-size: 15px;display: block;margin-bottom: 0px;"><label
                                            id="greeting1"></label>,
                                        {{ Auth::user()->NamaUser }}</p> {{-- bisa dikasih profile --}}
                                </div>
                                <li><a class="RDZlogout" style="color: black;font-size: 15px;display: block;"
                                        href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </li>
                            </ul>
                        @endguest

                    </div>
                </div>
            </nav>

            <main class="py-4">
                @yield('content')
            </main>
        </div>
        <script>
            $(document).ready(function() {
                $('.dropdown-submenu a.test').on("click", function(e) {
                    $(this).next('ul').toggle();
                    e.stopPropagation();
                    e.preventDefault();
                });
            });
        </script>
    </body>

</html>
