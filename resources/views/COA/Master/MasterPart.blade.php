@extends('layouts.appCOA')

@section('content')
<div class="container-fluid">
    {{-- <link href="{{ asset('css/Contoh/contoh.css') }}" rel="stylesheet"> --}}
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
                <div class="card-header">Master Part Section</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id" readonly>
                    </div>
                    <div class="form-group">
                        <label for="part">Part Section</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="part" name="part" required>
                            <div class="input-group-append">
                                <button type="button" id="btn_lihat" class="btn btn-info">...</button>
                            </div>
                        </div>
                    </div>
                    <button type="button" id="btn_proses" class="btn btn-outline-secondary">Proses</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/COA/Master//MasterPart.js') }}"></script>
<style>
    .btn-disabled {
        cursor: not-allowed;
    }
</style>
@endsection
