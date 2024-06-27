@extends('layouts.app')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 RDZMobilePaddingLR0">
                <h1 style="text-align: center">HOME</h1>
                <div class="acs-grid-container">
                    <script>
                        @if (Session::has('status'))
                            Swal.fire({
                                icon: 'info',
                                title: 'Informasi',
                                text: '{{ Session::get('status') }}',
                            });
                        @endif
                    </script>
                    @foreach ($AccessProgram as $item)
                        <?php $modifiedNamaProgram = str_replace("\n", '<br>', $item->NamaProgram);
                        $namaIconProgram = str_replace("\n", '_', $item->NamaProgram);
                        $routeProgram = $item->RouteProgram ?? $item->NamaProgram; ?>
                        <a class="acs-link" href="{{ url($routeProgram) }}">
                            <div class="acs-card">
                                <h2 class="acs-txt-card">{!! $modifiedNamaProgram !!}</h2>
                                <img src="{{ asset('/images/' . $namaIconProgram . '.png') }}" alt=""
                                    class="acs-img-card">
                            </div>
                        </a>
                    @endforeach
                    <!-- <div class="acs-card" onclick="OpenNewTab('{{ url('Sales') }}');">
                                            <h2 class="acs-txt-card">SALES</h2>
                                            <img src="{{ asset('/images/Sales.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('Beli') }}');">
                                            <h2 class="acs-txt-card">BELI</h2>
                                            <img src="{{ asset('/images/OrderPembelian.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('Inventory') }}');">
                                            <h2 class="acs-txt-card">INVENTORY</h2>
                                            <img src="{{ asset('/images/Inventory.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('Utility') }}');">
                                            <h2 class="acs-txt-card">UTILITY</h2>
                                            <img src="{{ asset('/images/Utility.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                                            <h2 class="acs-txt-card">EDP</h2>
                                            <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                                            <h2 class="acs-txt-card">MENU</h2>
                                            <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                                            <h2 class="acs-txt-card">MENU</h2>
                                            <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                                        </div>
                                        <div class="acs-card" onclick="OpenNewTab('{{ url('EDP') }}');">
                                            <h2 class="acs-txt-card">MENU</h2>
                                            <img src="{{ asset('/images/EDP.png') }}" alt="" class="acs-img-card">
                                        </div> -->
                </div>
            </div>
        </div>
    </div>
@endsection
