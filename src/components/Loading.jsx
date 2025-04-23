import React from 'react';

export default function Loading(){
    return (
        <div class="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity" >
          <div class="flex-col">
            <x-loading class="w-24 h-24">
             
            </x-loading>
            <div class="mt-3 text-gray-200 font-mono text-sm sm:text-xs">Loading...</div>
          </div>
        </div>
    );
};

