const { sortByTitle, sortByPriority, sortByDueDate, getEntireIndex } = require("../utils/dataManipulationUtils")


const data = [
    {
        title: 'pooja',
        priority: 'low',
        dueDate: '2024-08-05'
    },
    {
        title: 'srija',
        priority: 'high',
        dueDate: '2024-08-02'
    },
    {
        title: 'jest',
        priority: 'medium',
        dueDate: '2024-08-08'
    },
]

describe('getEntireIndex', () => {
    it('should return index of item found from data', () => {
        expect(getEntireIndex(data, 'jest', 'title')).toEqual(2)
    })
})

describe('testing sortByTitle', () => {
    it('should return sorted array in asc order', async() => {
        const res = await sortByTitle(data, 'asc');
        expect(res).toEqual([
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            },
        ])
    })
    it('should return sorted array in desc order', async() => {
        const res = await sortByTitle(data, 'desc');
        expect(res).toEqual([
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            },
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
        ])
    })
    it('should trow an error when invalid query param is recevied', () => {
        expect(sortByTitle(data, 'test')).rejects.toThrow(expect.objectContaining({
            statusCode: 400,
            errorCode:"INVALID_QUERY_PARAM", 
            message: "Invalid query params"
        }))
    })
})

describe('testing sortByPriority', () => {
    it('should return sorted array in asc order', async() => {
        const res = await sortByPriority(data, 'asc');
        expect(res).toEqual([
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            }
        ])
    })
    it('should return sorted array in desc order', async() => {
        const res = await sortByPriority(data, 'desc');
        expect(res).toEqual([
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            },
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
        ])
    })
    it('should trow an error when invalid query param is recevied', () => {
        expect(sortByPriority(data, 'test')).rejects.toThrow(expect.objectContaining({
            statusCode: 400,
            errorCode:"INVALID_QUERY_PARAM", 
            message: "Invalid query params"
        }))
    })
})

describe('testing sortByDueDate', () => {
    it('should return sorted array in asc order', async() => {
        const res = await sortByDueDate(data, 'asc');
        expect(res).toEqual([
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            },
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
        ])
    })
    it('should return sorted array in desc order', async() => {
        const res = await sortByDueDate(data, 'desc');
        expect(res).toEqual([
            {
                title: 'jest',
                priority: 'medium',
                dueDate: '2024-08-08'
            },
            {
                title: 'pooja',
                priority: 'low',
                dueDate: '2024-08-05'
            },
            {
                title: 'srija',
                priority: 'high',
                dueDate: '2024-08-02'
            },
        ])
    })
})
