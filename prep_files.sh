if [ "$#" -lt 2 ]; then
    echo "Usage: ./prep_files.sh <day_number> <file_ext>"
    exit 1
fi

day="$1"
ext="$2"

day_dir="day$day"

mkdir "$day_dir"
touch "$day_dir/puzzle1.$ext" "$day_dir/puzzle2.$ext"

if [ "$ext" = 'py' ]; then
    touch "$day_dir/__init__.py"
fi

if [ "$ext" != 'js' ]; then
    touch "$day_dir/example.$ext"
    touch "$day_dir/input.$ext"
    touch "$day_dir/lib.$ext"
fi

echo "folder and base files for day $day have been created with the .$ext extension"