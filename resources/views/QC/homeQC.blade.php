@extends('layouts.appQC')
@section('content')
    <div class="container-fluid">
        <link href="{{ asset('css/Contoh/contoh.css') }}" rel="stylesheet">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">aaaaalskdlasdjkaa</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <img src="{{ asset('/images/Contoh1.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-sp.js') }}"></script>
@endsection
