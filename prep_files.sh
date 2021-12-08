if [ "$#" -lt 2 ]; then
    echo "Usage: ./prep_files.sh <day_number> <file_ext>"
    exit 1
fi

day="$1"
ext="$2"

mkdir "day$day"
touch "day$day/puzzle1.$ext" "day$day/puzzle2.$ext"

echo "folder and base files for day $day have been created with the .$ext extension"