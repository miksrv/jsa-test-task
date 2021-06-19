const getPriority = (priority) => {
    switch (priority) {
        case 'critical' : return {c: 'purple', t: 'Критический'}
        case 'high' : return {c: 'red', t: 'Высокий'}
        case 'middle' : return {c: 'orange', t: 'Средний'}
        case 'low' : default : return {c: 'green', t: 'Низкий'}
    }
}

export default getPriority