class Solution(object):
    def setZeroes(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: None Do not return anything, modify matrix in-place instead.
        """
        if not matrix:
            return
        zeros_r = set()
        zeros_c = set()
        m = len(matrix)
        n = len(matrix[0])
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == 0:
                    zeros_r.add(r)
                    zeros_c.add(c)
        for r in range(m):
            for c in range(n):
                if r in zeros_r or c in zeros_c:
                    matrix[r][c] = 0

class Solution(object):
    def setZeroes(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: None Do not return anything, modify matrix in-place instead.
        """
        if not matrix:
            return
        m = len(matrix)
        n = len(matrix[0])
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == 0:
                    for rn in range(m):
                        matrix[rn][c] = None 
                    for cn in range(n):
                        matrix[r][cn] = None 
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == None:
                    matrix[r][c] = 0


class Solution(object):
    def setZeroes(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: None Do not return anything, modify matrix in-place instead.
        """
        if not matrix:
            return
        m = len(matrix)
        n = len(matrix[0])
        for r in range(m):
            for c in range(n):
                if matrix[r][c] == 0:
                    matrix[0][c] = None 
                    matrix[r][0] = None
        for r in range(m):
            if matrix[r][0] == None:
                for c in range(n):
                    matrix[r][c] = 0      
        for c in range(n):
            if matrix[0][c] == None:
                for r in range(m):
                    matrix[r][c] = 0  
                     
given

    matrix = [
        [1,1,1]
        [1,0,1]
        [1,1,1]
    ]
return 
    matrix = [
        [1,0,1]
        [0,0,0]
        [1,0,1]
    ]
transforming in place
