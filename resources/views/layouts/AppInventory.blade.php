<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title style="font-size: 20px">@yield('title', 'Inventory')</title>

    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
    <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title>

    {{-- <title style="font-size: 20px">{{ config('app.name', 'Payroll') }}</title> --}}

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' type='text/javascript'></script>
    <script>
        var msg = '{{ Session::get('alert') }}';
        var exist = '{{ Session::has('alert') }}';
        if (exist) {
            alert(msg);
        }
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.1.0.js"></script> -->
    <!-- <script src="//code.jquery.com/jquery-1.11.0.min.js"></script> -->
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.min.js"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>


    <script src="{{ asset('js/User.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/appInventory.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    {{-- <title>{{ $title }}</title> --}}
</head>

<body onload="Greeting()">
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
            <div class="container col-md-12">
                <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                    <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                    {{ config('app.name', 'Payroll') }}
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto RDZNavContenCenter">
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Master
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">



                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/KodePerkiraan') }}">Maintenance Kode
                                        Perkiraan</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/MaintenanceObjek') }}">Maintenance
                                        Objek</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/MaintenanceType') }}">Maintenance Type
                                        Barang Per Divisi</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/StokBarang') }}">Maintenance
                                        Max/Min Stock Barang Per Divisi</a>
                                </li>

                            </ul>
                        </div>
                        <!-- Agenda -->
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Transaksi
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/TerimaPurchasing') }}">Transfer
                                        Pembelian (Terima Barang)</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Pemberian / Hibah &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/PermohonanHibah') }}">Permohonan Hibah</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/AccPermohonanHibah') }}">ACC
                                                Permohonan Hibah</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/PenerimaHibah') }}">Penerimaan Hibah</a>
                                        </li>

                                    </ul>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Mutasi Barang &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                tabindex="-1">Mutasi Antar Divisi &raquo;</a>

                                            <ul class="dropdown-menu dropdown-submenu">
                                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                        tabindex="-1">Awal Sebagai Penerima &raquo;</a>

                                                    <ul class="dropdown-menu dropdown-submenu">
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormMhnPenerima') }}">Permohonan
                                                                Penerima (Bon Barang)</a>
                                                        </li>
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormAccMhnPenerima') }}">Acc
                                                                Permohonan Penerima
                                                            </a>
                                                        </li>
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormAccPemberiBarang') }}">Acc
                                                                Pemberi Barang</a>
                                                        </li>
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormPemberiBarang') }}">Pemberi Barang
                                                            </a>
                                                        </li>

                                                    </ul>
                                                </li>
                                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                        tabindex="-1">Awal Sebagai Pemberi &raquo;</a>

                                                    <ul class="dropdown-menu dropdown-submenu">
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormMhnPemberi') }}">Permohonan
                                                                Pemberi</a>
                                                        </li>
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormPermohonanPenerima') }}">Penerima Barang
                                                            </a>
                                                        </li>
                                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                                tabindex="-1"
                                                                href="{{ url('Inventory/FormPermohonanPenerimaBenang') }}">Penerima Benang
                                                                (CL)</a>
                                                        </li>

                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                tabindex="-1">Mutasi Satu Divisi &raquo;</a>

                                            <ul class="dropdown-menu dropdown-submenu">
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('Inventory/FormPermohonanSatuDivisi') }}">Permohonan
                                                        Satu Divisi</a>
                                                </li>
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('Inventory/FormAccSatuDivisi') }}">ACC Satu
                                                        Divisi
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                tabindex="-1">Mutasi Keluar/Masuk PT KRR &raquo;</a>

                                            <ul class="dropdown-menu dropdown-submenu">
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('Inventory/FormReturPenjualan') }}">Acc Keluar
                                                        Brg u/ Penjualan</a>
                                                </li>
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('Inventory/FormReturPenjualan') }}">ACC Retur
                                                        Barang Dari Penjualan
                                                    </a>
                                                </li>
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('Inventory/FormPengembalianPascaPenjualan') }}">ACC
                                                        Pengembalian Pasca Kirim
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                                tabindex="-1" hidden>Mutasi Masuk/Keluar &raquo;</a>

                                            <ul class="dropdown-menu dropdown-submenu">
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('ProgramInventory/AgendaMasuk/Jam') }}">Permohonan
                                                        Masuk/Keluar</a>
                                                </li>
                                                <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                        tabindex="-1"
                                                        href="{{ url('ProgramInventory/AgendaMasuk/Jam') }}">Acc
                                                        Permohonan
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Konversi Barang &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/FormKonversiBarang') }}">Permohonan
                                                Konversi</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('Inventory/FormAccKonversiBarang') }}">Acc
                                                Permohonan Konversi
                                            </a>
                                        </li>

                                    </ul>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Penghangusan Barang (Pemakaian) &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/FormPenghangusanBarang') }}">Permohonan
                                                Penghangusan</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('Inventory/FormAccPenghangusanBarang') }}">Acc
                                                Penghangusan Barang
                                            </a>
                                        </li>


                                    </ul>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Penyesuaian Barang &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/FormPenyesuaianBarang') }}">Permohonan
                                                Penyesuaian</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('Inventory/FormAccPenyesuaianBarang') }}">Acc
                                                Penyesuaian Barang
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Terima Benang Extruder &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/FormTerimaBenangTropodo') }}">Terima Benang
                                                Tropodo
                                            </a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/FormTerimaBenangGedungD') }}">Terima Benang
                                                Gedung D
                                            </a>
                                        </li>


                                    </ul>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/FormPemakaianGelondongan') }}">Pemakaian
                                        Gelondongan
                                    </a>
                                </li>


                            </ul>
                        </div>
                        <!-- Transaksi -->
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Informasi
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/KartuStok') }}">Kartu
                                        Stok</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Kartu Transaksi &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/TransaksiHarian') }}">Transaksi PerHari
                                            </a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('Inventory/TransaksiBulanan') }}">Transaksi PerBulan
                                            </a>
                                        </li>


                                    </ul>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/LacakTransaksi') }}">Lacak
                                        Transaksi
                                    </a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Inventory/CariKodeBarang') }}">Cari Kode
                                        Barang</a>
                                </li>


                            </ul>
                        </div>



                    </ul>
                    <!-- Right Side Of Navbar -->

                    <!-- Authentication Links -->

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
