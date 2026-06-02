const birthInput = document.getElementById('birth-date') as HTMLInputElement
const targetInput = document.getElementById('target-date') as HTMLInputElement
const resultAge = document.getElementById('result-age')!
const resultMajor = document.getElementById('result-major')!
const calculateBtn = document.getElementById('calculate-btn')!

const today = new Date()
const yyyy = today.getFullYear()
const mm = String(today.getMonth() + 1).padStart(2, '0')
const dd = String(today.getDate()).padStart(2, '0')
targetInput.value = `${yyyy}-${mm}-${dd}`

function calcularEdad(birth: Date, target: Date) {
  let años = target.getFullYear() - birth.getFullYear()
  let meses = target.getMonth() - birth.getMonth()
  let días = target.getDate() - birth.getDate()

  if (días < 0) {
    meses--
    const mesAnterior = new Date(target.getFullYear(), target.getMonth(), 0)
    días += mesAnterior.getDate()
  }

  if (meses < 0) {
    años--
    meses += 12
  }

  return { años, meses, días }
}

function mostrarResultado() {
  const birthStr = birthInput.value
  const targetStr = targetInput.value

  if (!birthStr || !targetStr) {
    resultAge.textContent = 'Completa ambas fechas'
    resultMajor.textContent = ''
    return
  }

  const birth = new Date(birthStr + 'T00:00:00')
  const target = new Date(targetStr + 'T00:00:00')

  if (target <= birth) {
    resultAge.textContent = 'La fecha específica debe ser mayor a la de nacimiento'
    resultMajor.textContent = ''
    return
  }

  const { años, meses, días } = calcularEdad(birth, target)
  const partes: string[] = []
  if (años > 0) partes.push(`${años} año${años !== 1 ? 's' : ''}`)
  if (meses > 0) partes.push(`${meses} mes${meses !== 1 ? 'es' : ''}`)
  if (días > 0) partes.push(`${días} día${días !== 1 ? 's' : ''}`)

  const edadStr = partes.join(', ')
  const esMayor = años >= 18
  const mayorStr = esMayor
    ? 'Es mayor de 18 años ✅'
    : 'No es mayor de 18 años ❌'

  resultAge.textContent = edadStr
  resultMajor.textContent = mayorStr
  resultMajor.className = esMayor ? 'mayor' : 'menor'
}

calculateBtn.addEventListener('click', mostrarResultado)
