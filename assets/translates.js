const translates = {
  es: {
    header: {
      index_page: {
        list: [
          { type: 'anchor', text: 'servicios', href: '#services' },
          { type: 'anchor', text: 'ciudades', href: '#cities' },
          { type: 'anchor', text: 'calcular', href: '#calculator' },
          { type: 'nav', text: 'reservaciones', href: '/reservations' }
        ]
      },
      reservations_page: {
        list: [
          { type: 'nav', text: 'pagina inical', href: '/' }
        ]
      }
    },
    hero: {
      title: 'BusoTaxi y ayudas de transporte en España'
    },
    services: {
      title: 'Servicios, en que podemos ayudar',
      list: ['Taxi de 7 plazas', 'Viajes concertados', 'Adaptado con rampa de acceso']
    },
    calculator: {
      title: 'Si quieres calcular o contactar',
      main: {
        header: {
          modes: {
            day: 'Día',
            night: 'Noche'
          }
        },
        form: {
          controls: {
            from: {
              label: 'Desde',
              error: 'Este origen no se ha encontrado'
            },
            to: {
              label: 'Hasta',
              error: 'Este destino no se ha encontrado'
            }
          },
          coincidence_error: 'El origen y el destino no deben estar en la misma ciudad'
        },
        bottom: {
          calculate_btn: 'Calcular'
        },
        phone_btn: 'Llа́manos'
      },
      popup: {
        title: 'Viajes concertados',
        description: 'Parece que quieres calcular un viaje especial. Por eso tienes que llamarnos para consultarse',
        button: 'Llamarnos',
        close_btn: 'Cerrar'
      }
    }
  },
  en: {
    header: {
      index_page: {
        list: [
          { type: 'anchor', text: 'services', href: '#services' },
          { type: 'anchor', text: 'cities', href: '#cities' },
          { type: 'anchor', text: 'calculator', href: '#calculator' },
          { type: 'nav', text: 'reservations', href: '/reservations' }
        ]
      },
      reservations_page: {
        list: [
          { type: 'nav', text: 'home page', href: '/' }
        ]
      }
    },
    hero: {
      title: 'BusoTaxi & help with transporting in Spain'
    },
    services: {
      title: 'Services we can help with',
      list: ['Taxi up to 7 seats', 'Arranged trips', 'Adapted with access ramp']
    },
    calculator: {
      title: 'If you want to calculate or contact',
      main: {
        header: {
          modes: {
            day: 'Day',
            night: 'Night'
          }
        },
        form: {
          controls: {
            from: {
              label: 'From',
              error: 'This origin wasn\'t found'
            },
            to: {
              label: 'To',
              error: 'This destination wasn\'t found'
            }
          },
          coincidence_error: 'Origin and destination must not be in the same city'
        },
        bottom: {
          calculate_btn: 'Calculate'
        },
        phone_btn: 'Call us'
      },
      popup: {
        title: '"Viajes concertados"',
        description: 'It sounds like you want to calculate a special trip. That\'s why you have to call us to consult',
        button: 'Call us',
        close_btn: 'Close'
      }
    }
  }
}

export default translates;