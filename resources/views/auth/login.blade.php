@extends('layouts.app')

@section('content')
    <script type="text/javascript">
        setInterval(function() {
            window.location.reload();
        }, 300000);
    </script>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">{{ __('Login') }}</div>

                    <div class="card-body">

                        @if (session()->has('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif
                        @error('error')
                            <div class="alert alert-danger">
                                {{ $message }}
                            </div>
                        @enderror

                        <form method="POST" action="{{ route('login') }}">
                            {{ csrf_field() }}

                            <div class="form-group">
                                <!-- <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label> -->

                                <div>
                                    <div class="input-group">
                                        <div class="input-group-addon RDZtextICON">
                                            <a><span class="material-icons form-control RDZICON">person</span></a>
                                        </div>
                                        <input id="username" type="text"
                                            class="form-control @error('username') is-invalid @enderror" name="username"
                                            value="{{ old('username') }}" autocomplete="username" autofocus
                                            placeholder="Username">

                                        @error('username')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div>
                                    <div class="input-group">
                                        <div class="input-group-addon RDZtextICON">
                                            <a><span class="material-icons form-control RDZICON">key</span></a>
                                        </div>
                                        <input id="password" type="password"
                                            class="form-control @error('password') is-invalid @enderror" name="password"
                                            autocomplete="current-password" placeholder="Password">

                                        <div class="input-group-addon">
                                            <a><span class="material-icons form-control RDZIconPassword"
                                                    onclick="ShowPassword('password','showpassword')"
                                                    id="showpassword">visibility_off</span></a>
                                        </div>
                                        <br>

                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <p id="text" style="display:none;color:red">WARNING! Caps lock is ON.</p>

                                </div>
                            </div>
                            <br>
                            <div class="mb-0">
                                <button type="submit" class="btn btn-primary"
                                    style="width: 100%;text-align: center;">Login</button>
                                <button id="btnRegister" class="btn btn-dark"
                                    style="width: 100%;text-align: center;">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var input = document.getElementById("password");
        var text = document.getElementById("text");
        var btnRegister = document.getElementById("btnRegister");

        input.addEventListener("keydown", function(event) {

            if (event.getModifierState("CapsLock")) {
                text.style.display = "block";
            } else {
                text.style.display = "none"
            }
        });

        btnRegister.addEventListener("click", function(event) {
            event.preventDefault();
            let user;
            Swal.fire({
                title: "Masukkan Nomor Login Anda",
                input: "number",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Ok",
                showLoaderOnConfirm: true,
                preConfirm: async (input) => {
                    try {
                        user = input;
                        let typeCommand = 'GetNomorKartu';
                        const form = new FormData();
                        const csrfToken = document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content");
                        form.append("_token", csrfToken);
                        form.append("input", input);
                        form.append("typeCommand", typeCommand);
                        const response = await fetch('Register', {
                            method: "POST",
                            headers: {
                                _token: csrfToken,
                            },
                            body: form,
                        });
                        if (!response.ok) {
                            return Swal.showValidationMessage(
                                `${JSON.stringify(await response.json())}`);
                        }
                    } catch (error) {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Masukkan Kata Sandi Anda",
                        input: "password",
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "Ok",
                        showLoaderOnConfirm: true,
                        preConfirm: async (input) => {
                            try {
                                let typeCommand = 'SetPassword';
                                const form = new FormData();
                                const csrfToken = document
                                    .querySelector('meta[name="csrf-token"]')
                                    .getAttribute("content");
                                form.append("_token", csrfToken);
                                form.append("input", input);
                                form.append("user", user);
                                form.append("typeCommand", typeCommand);
                                const response = await fetch('Register', {
                                    method: "POST",
                                    headers: {
                                        _token: csrfToken,
                                    },
                                    body: form,
                                });
                                if (!response.ok) {
                                    return Swal.showValidationMessage(
                                        `${JSON.stringify(await response.json())}`);
                                }
                                return response.json();
                            } catch (error) {
                                Swal.showValidationMessage(`Request failed: ${error}`);
                            }
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log(result);
                            if (result.value == "success") {
                                Swal.fire({
                                    title: "Berhasil!",
                                    text: `User ${user} berhasil terdaftar!`, // Use backticks for template literal
                                    icon: "success",
                                    timer: 1700,
                                });
                            } else {
                                Swal.fire({
                                    title: "Gagal!",
                                    text: `${result.value}`, // Use backticks for template literal
                                    icon: "error",
                                });
                            }
                        }
                        document.getElementById("username").focus();
                    });
                };
            });
        });
    </script>
@endsection
