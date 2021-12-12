
from lib import Edge


value = """QF-bw
end-ne
po-ju
QF-lo
po-start
XL-ne
bw-US
ne-lo
nu-ne
bw-po
QF-ne
ne-ju
start-lo
lo-XL
QF-ju
end-ju
XL-end
bw-ju
nu-start
lo-nu
nu-XL
xb-XL
XL-po"""

data = [Edge(*l.split('-')) for l in value.split('\n')]
