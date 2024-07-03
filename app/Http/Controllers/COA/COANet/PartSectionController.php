<?php

namespace App\Http\Controllers\COA\COA\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;

class PartSectionController extends Controller{
    public function getPart($kode)
    {
        return DB::connection('ConnTestQC')->select(
            'exec SP_1273_LIST_COA @kode = ?',
            [$kode]
        );

    }
}


?>
