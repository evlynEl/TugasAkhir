@extends('layouts.AppInventory')
@section('content')
    {{-- <script type="text/javascript" src="{{ asset('js/Agenda/agendaJam.js') }}"></script> --}}
    <script>
        $(document).ready(function() {
            $("#tabel_Hibah").DataTable({
                order: [
                    [0, "asc"]
                ],
            });
        });
    </script>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">

                <div class="card">
                    <div class="card-header">Permohonan Hibah</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="flex: 1; margin-left:10 px">
                        <div style="display: flex; flex-wrap: nowrap; align-items: center;">
                            <div style="flex: 1; margin-right: 10px;">
                                <label style="margin-right: 10px;">Tanggal</label>
                                <div style="display: flex; align-items: center;">
                                    <input class="form-control" type="date" id="TglAwal" name="TglAwal"
                                        value="{{ old('TglAwal', now()->format('Y-m-d')) }}" style="width: 210px;">


                                </div>

                            </div>
                            <div style="flex: 1; margin-right: 10px;margin-left:35px">
                                <label style="margin-right: 10px;">Divisi</label>
                                <div class="form-group col-md-9 mt-3 mt-md-0" style="margin-left:-15px;">

                                    <input class="form-control" type="text" id="Id_Div" readonly
                                        style="resize: none; height: 40px; max-width: 100px;">
                                    <input class="form-control" type="text" id="Nama_Div" readonly
                                        style="resize: none; height: 40px; max-width: 450px;">
                                    {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                    style="resize: none; height: 40px; max-width: 250px;">
                                    <option value=""></option>
                                    @foreach ($divisi as $data)
                                        <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                    @endforeach
                                </select> --}}
                                    <button type="button" class="btn" style="margin-left: 10px; " id="divisiButton"
                                        data-toggle="modal" data-target="#modalDivPeg">...</button>

                                    <div class="modal fade" id="modalDivPeg" role="dialog" arialabelledby="modalLabel"
                                        area-hidden="true" style="">
                                        <div class="modal-dialog " role="document">
                                            <div class="modal-content" style="">
                                                <div class="modal-header" style="justify-content: center;">

                                                    <div class="row" style=";">
                                                        <div class="table-responsive" style="margin:30px;">
                                                            <table id="tabel_Divisi" class="table table-bordered">
                                                                <thead class="thead-dark">
                                                                    <tr>
                                                                        <th scope="col">Id Divisi</th>
                                                                        <th scope="col">Nama Divisi</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>


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



                        </div>
                        <br>

                    </div>

                    <div class="card-body-container" style="display: flex; flex-wrap: nowrap;">
                        <div class="card-body" style="flex: 1; margin-right: 10px;">
                            <div class="card-body"
                                style="flex: 1; margin-right: 10px; border: 1px solid #000000; border-radius: 3px; text-align: middle;"
                                id="peroranganSection">
                                <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="flex: 1; margin-left:10;">

                                    <br>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered" id="tabel_Hibah">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No Transaksi</th>
                                                    <th scope="col">Nama Type</th>

                                                </tr>
                                            </thead>
                                            <tbody class="table-group-divider">

                                                {{-- @foreach ($dataDivisi as $data)
                                                    <tr>
                                                        <td>{{ $data->Id_Div }}</td>
                                                        <td>{{ $data->Nama_Div }}</td>

                                                    </tr>
                                                @endforeach --}}
                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="card-body" style="flex: 1; margin-right: 10px;">
                            <div class="card-body"
                                style="flex: 1; margin-right: 10px; border: 1px solid #000000; border-radius: 3px;"
                                id="divisiSection">
                                <div class="card-body RDZOverflow RDZMobilePaddingLR0" style="flex: 1; margin-left:10;">

                                    <br>
                                    <div class="row" style="margin-left:-100px;">
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
                                    <div class="row" style="margin-left:-100px;">
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
                                    <div class="row" style="margin-left:-100px;">
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
                                    <div class="row" style="margin-left:-100px;">
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
                                    <div class="row" style="margin-left:-100px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Id&nbsp;Type:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 550px;">
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
                                    <div class="row" style="margin-left:-100px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Nama&nbsp;Type:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 550px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
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
                                    <div class="row" style="margin-left:-100px;">
                                        <div class="form-group col-md-3 d-flex justify-content-end">
                                            <span class="aligned-text">Nama&nbsp;Pemberi:</span>
                                        </div>
                                        <div class="form-group col-md-9 mt-3 mt-md-0">
                                            <input class="form-control" type="text" id="Nama_Posisi" disabled
                                                style="resize: none; height: 40px; max-width: 550px;">
                                            {{-- <select class="form-control" id="Nama_Div" readonly name="Nama_Div"
                                                style="resize: none; height: 40px; max-width: 250px;">
                                                <option value=""></option>
                                                @foreach ($divisi as $data)
                                                    <option value="{{ $data->Id_Div }}">{{ $data->Nama_Div }}</option>
                                                @endforeach
                                            </select> --}}
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
                                    <div id="form-container"></div>
                                    <div style="text-align: center; margin-top: 100px;">
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
                                            id="ProsesButton">Proses</button>
                                        <button type="button" class="btn " style="width:75px;"
                                            id="keluarButton">Keluar</button>
                                    </div>














                                </div>
                            </div>
                        </div>


                    </div>








                    <br>







                </div>
            </div>

        </div>
        <br>

    </div>
    </div>
    </div>
@endsection
