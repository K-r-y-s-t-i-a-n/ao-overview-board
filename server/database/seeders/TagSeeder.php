<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $categories = [
        //     'Picking machines'    => ['ARX'   => [1, 2, 3, 4, 5]],
        //     'Tapers'              => ['OAT'   => [1, 2, 3]],
        //     'Autoblockers'        => ['OAB'   => [1, 2, 3, 4, 5, 6, 7]],
        //     'Manual blockers'     => ['MB'    => [1, 2]],
        //     'Generators'          => ['G'     => [17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29]],
        //     'Lasers'              => ['LASER' => [1, 2, 3, 4, 5]],
        //     'Polishers'           => ['P'     => [1, 12, 15, 16, 21, 22, 23, 24, 25, 26, 27, 98]],
        //     'Deblockers'          => ['DBA'   => [1, 2, 3, 4, 5]],
        //     'Detapers'            => ['TSA'   => [1, 2, 3, 4, 5]],
        //     'Washing machines'    => ['WASH'  => [1, 2]],
        //     'Inspection machines' => ['PC'    => [50, 51, 52, 53, 54]],
        //     'Package machines'    => ['PACK'  => [1, 2]],
        //     'Dispatch machines'   => ['DIS'   => [1, 2]],
        //     'Coating' => [
        //         'TINT'  =>  [1, 2],
        //         'SCL'   =>  [1, 2, 3, 5, 6],
        //         'DLX'   =>  [1, 2, 3],
        //         'SYR'   =>  [1, 2]
        //     ]
        // ];

        $categories = [
            'Picking machines',
            'Tapers',
            'Autoblockers',
            'Manual blockers',
            'Generators',
            'Lasers',
            'Polishers',
            'Deblockers',
            'Detapers',
            'Washing machines',
            'Inspection machines',
            'Package machines',
            'Dispatch machines',
            'Coating',
            'Other tags'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert(['name' => $category]);
        }

        $tags = [
            // PRODUCTION
            'ARX'   =>  [1, 2, 3, 4, 5],
            'OAT'   =>  [1, 2, 3],
            'OAB'   =>  [1, 2, 3, 4, 5, 6, 7],
            'MB'    =>  [1, 2],
            'G'     =>  [17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            'LASER' =>  [1, 2, 3, 4, 5],
            'P'     =>  [1, 12, 15, 16, 21, 22, 23, 24, 25, 26, 27, 98],
            'DBA'   =>  [1, 2, 3, 4, 5],
            'TSA'   =>  [1, 2, 3, 4, 5],
            'HK'  =>  [1, 2],
            'PC'    =>  [50, 51, 52, 53, 54],
            'PACK'  =>  [1, 2],
            'DIS'   =>  [1, 2],
        ];

        $coating_tags = [
            // COATING
            'TINT'  =>  [1, 2],
            'SCL'   =>  [1, 2, 3, 5, 6],
            'DLX'   =>  [1, 2, 3],
            'SYR'   =>  [1, 2]
        ];

        $other_tags = ['OTHER', 'CONVEYORS'];

        $category_id = 1;

        foreach ($tags as $tag => $numbers) {
            foreach ($numbers as $number) {
                Tag::create([
                    'name' => $tag . ' ' . $number,
                    'created_by' => 'system',
                    'category_id' => $category_id
                ]);
            }
            $category_id++;
        }

        foreach ($coating_tags as $tag => $numbers) {
            foreach ($numbers as $number) {
                Tag::create([
                    'name' => $tag . ' ' . $number,
                    'created_by' => 'system',
                    'category_id' => $category_id
                ]);
            }
        }

        $category_id++;

        foreach ($other_tags as $tag) {
            Tag::create([
                'name' => $tag,
                'created_by' => 'system',
                'category_id' => $category_id
            ]);
        }
    }
}
