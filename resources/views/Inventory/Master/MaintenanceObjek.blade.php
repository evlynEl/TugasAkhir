@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Objek</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="border: solid black 1px">
                        <div class="card-body-container" style="display: flex; flex-wrap: nowrap;">

                            <div class="card-body " style="margin-left:">
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Divisi:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; " id="posisiButton"
                                            onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog" arialabelledby="modalLabel"
                                            area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Objek:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; " id="posisiButton"
                                            onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog" arialabelledby="modalLabel"
                                            area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Kelompok Utama:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; "
                                            id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog"
                                            arialabelledby="modalLabel" area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Kelompok:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; "
                                            id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog"
                                            arialabelledby="modalLabel" area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Sub Kelompok:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; "
                                            id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog"
                                            arialabelledby="modalLabel" area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:-400px;">
                                    <div class="form-group col-md-3 d-flex justify-content-end">
                                        <span class="aligned-text">Kode Perkiraan:</span>
                                    </div>
                                    <div class="form-group col-md-9 mt-3 mt-md-0">

                                        <input class="form-control" type="text" id="Kd_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 100px;">
                                        <input class="form-control" type="text" id="Nama_Posisi" disabled
                                            style="resize: none; height: 40px; max-width: 450px;">
                                        {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                            style="resize: none; height: 40px; max-width: 250px;">
                                            <option value=""></option>
                                            @foreach ($divisi as $data)
                                                <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                            @endforeach
                                        </select> --}}
                                        <button type="button" class="btn" style="margin-left: 10px; "
                                            id="posisiButton" onclick="showModalPosisi()" disabled>...</button>

                                        <div class="modal fade" id="modalPosisi" role="dialog"
                                            arialabelledby="modalLabel" area-hidden="true" style="">
                                            <div class="modal-dialog " role="document">
                                                <div class="modal-content" style="">
                                                    <div class="modal-header" style="justify-content: center;">
                                                        <div class="row" style=";">
                                                            <div class="table-responsive" style="margin:30px;">
                                                                <table id="tabel_Posisi" class="table table-bordered">
                                                                    <thead class="thead-dark">
                                                                        <tr>
                                                                            <th scope="col">Kd Posisi</th>
                                                                            <th scope="col">Nama Posisi</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {{-- @foreach ($dataPosisi as $data)
                                                                            <tr>

                                                                                <td>{{ $data->KD_Posisi }}</td>
                                                                                <td>{{ $data->Nm_Posisi }}</td>



                                                                            </tr>
                                                                        @endforeach
         --}}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row" style="margin-left:;">
                                    <div style="margin: 20px;">


                                        <button type="button" class="btn " style="width:75px;"
                                            id="isiButton">Isi</button>
                                        <button type="button" class="btn " style="width:75px;" id="SimpanIsiButton"
                                            hidden>SIMPAN</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="SimpanKoreksiButton" hidden>SIMPAN</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="KoreksiButton">Koreksi</button>
                                        <button type="button" class="btn " style="width:75px;" id="BatalIsiButton"
                                            hidden>BATAL</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="BatalKoreksiButton" hidden>BATAL</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="HapusButton">Hapus</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="ProsesButton">Proses</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="keluarButton">Keluar</button>
                                    </div>
                                </div>

                            </div>

                        </div>



                    </div>
                </div>
                <br>

            </div>
        </div>
    </div>
@endsection
