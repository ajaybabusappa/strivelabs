#Python is a General Purpose Language
#Interpreted, Object Oriented, High Level language
#Also supports procedural coding
#Python 3.0 is not backward compatable.
#In command prompt use 'python --version'
#You can work on IDLE as well (More like commnad prompt for python)
#You can use command prompt as well. Check path if not working
#.py is the file extension
#Is python compiled or interpreted language? Answer is both.
#Compiled to support WORA to give a bite code for portability. Compiler compiles to .py file. Interpretar interprets line by line
#cpython, jython, IronPython
print("Hello")

#Operators - +, -, *, /, %

print(8/4) # Gives output 2.0
print(8//4) # Gives 2. This is called Integer division or floor division
print (5 ** 3) #Power

#Strings - Either single qoute or double
print("ajay")
print ('navin"s laptop') #Observe the combination
print ("navin's laptop") #Observe the combination
print ('navin\'s laptop')#Backslash - Neglects the meaning

print ('navin ' * 10)

print ('c:\docs\navin') #This will create a new line at avin because of \n
print (r'c:\docs\navin') #r means raw string

print("Even: {} and Odd: {}".format(3,2))
#Data types in Python
#1. None
#2. Numeric - int, float, complex, bool
#Boll is True or False.
#3. Sequence - List, Tuple, Set, String, Range
#4. Dictionary


num23 = 2.5
print(type(num23)) #Gives float

conNum = int(num23) #Conversion. Similarly vice versa
print(conNum)

comNum = complex(2,3)

boolVar = 5 < 6
print(boolVar)

int(boolVar) #Gives 1

num33 = 3 + 4j
print(type(num33)) #Gives complex





#Variables in Python
x = 2
y = 2
print(x + 3)

print(id(2))
print(id(x))
print(id(y)) # All 3 gives same value
#Because both x and y are just points to same value.
#That's why python is more memory efficient
#If after some time no one is using 2 then it will be Garbage collected.


#There are no constants in Python. You can only show intentions by using Caps.


#Type of a variable
print(type(x))
#All are classes in Python. Here you will get int class

#String
name = 'YOUTUBE'
print (name[0: 2])
print (name[-5])
print (name[1:])
print (name[:4])
print (name[3: 10]) #Does not give any error
print (len(name)) #Gives length of string
#String index out of range error exists
#Strings are immutable in python
# i.e
#name[0: 2] = "AB" gives you an error



#List in Python
#Indexing works in List
#List index out of range exists
#Slicing works in list
#Mutable
nums = [25, "Ajay", [13, "Things"], 9.5]
print(nums[2][0])
nums.append(45) #Appends at the end
nums.insert (5, 55) #Inserts at 5th place
print(nums)

nums.remove(9.5) #Remove is based on value
nums.pop(1) #Pop is based on index
nums.pop() #Pops the last

del nums [5:] #Deletes everything from 5
nums.extend([29, 13, "Mango"])
print(nums)
#print(min(nums)) --- Works if all integers
#Similarly max, sum

num1 = [5, 6, 8, 1]
num1.sort() # For sorting a list
print(num1)


#Tuple
#Immutable
#Faster to iterate because it's immutable
#Indexation allowed
tup = (5, 10, 'Bag')
print(tup[2])
#No append, no pop, no replace etc functions
#Only count (counts frequencies) and index functions are there


#Set
#It does not follow sequence. Because uses hashing for efficient searches
#Muttable
#You can add, remove, substract etc
s1 = {22, 25, 14, 22, 14}
print(s1)
#Doesnot give duplicates in output
#Order of elements will not be same. So no indextation


#range
print(range(0, 10)) #Gives range (0, 10) as output
print(list(range(0,10))) #To actually see the numbers
print (list(range(2, 10, 2))) #Gives even numbers

#Dictionary
dic = {'ajay': 'samsung', 'mahesh': 'iphone'}
print(dic.keys())
print(dic.values())
print(dic['ajay'])


#Operators
#1. Arithmetic operators - (+, -, *, / etc)
#2. Assignment operators - (=, +=, -=, *= etc)
#3. Relational operators - (<, >, <=, >=, ==, !=)
#4. Logical operators - (and, or, not)
#5 Unary operator 
#6 Bitwise operator - Complement(~), &, |, ^, << (left shit), >> (right shift)

t1, t2 = 2, 5

t1 = -t1 #Negation operator
print(t1)

print ("Result is", 2 > 5 and 3 < 6)
boolx = False
if (not boolx):
    print("Hurray!!!")


#Number Systems: Binary, Oct, Hex
print(bin(25)) #output will be 0b11001
print(oct(25)) #output will be 0o319
print(hex(25)) #output will be 0x1
print(0b1101)


#Bitwise operators
print(~12) #Gives -13 (Which is complimnet of 12 - Calculating 2's complimnet i.e is 1's complimnet + 1 of -13)
print (12 & 13)
print (12 | 13)
print (12 ^ 13)
print (10 << 2) #Leftshift by 2 (1010 is made to 101000)
#Left shift increases value and right shift decreases value


#Math operator
import math as m
#
sqr = m.sqrt(25)
print(sqr)
print(m.floor(2.9))
print(m.pow(5,2.2)) #For powers
print(m.pi)
print(m.e)

from math import sqrt, pi
#Can also be imported like this
print(sqrt(29))


#Taking user input
#inp1 = int(input("Hai, Enter something"))
#print(inp1)
#If you don't convert then you are by default string
#If input is string, then you perform slicing operations right after input
#Entering input from command prompt
#in command prompt give command python practise.py 2 3 5
#in code it should be as follows
#import sys
#inp1 = sys.argv[1]
#inp2 = sys.argv[2]


#print(eval(input('enter expression)))
#If you enter 2 - 5 + 5. You get evaluated answer directly



#Conditions and Loops
#Indendation can be any number. Generally it is 4 which is equal to a tab
lpex = 6
if lpex > 5:
    print("10 is greater than 5")
    if (lpex < 10):
        print("Not geater than 5")
elif lpex == 0:
    pass
else:
    print("Not really")


#While loop
w1 = 1
w2 = 1
while w1 <= 5:
    print("Telusko")
    while w2 <= 4:
        print("Rocks ")
        w2 += 1
    w2 = 1
    w1 += 1


#For loop
x = 'NAVIN'
for i in x: #Or for i in range(10)
    print(i)


#Forelse loop
#Basically if you write else at the if level, you will not found 5 times
#So, else can be written at for level. Which runs only once
#You need to have break in order for this to work

felp = [12, 16, 18, 21, 26]
for num in felp:
    if num % 5 == 0:
        print(num)
        break
else:
    print("not found")

#See difference between continue, break and pass
#pass is basically to say there is nothing here. As a dummy place holder


#Printing patterns
for i in range(3):
    for j in range(3):
        print('# ', end = "")
    print('\n')

#For left skewed traingle
for i in range(3):
    for j in range(i+1):
        print('# ', end = "")
    print('\n')


for i in range(3):
    for j in range(3 - i):
        print('# ', end = "")
    print('\n')



#Find if given number is a prime
pm = 45
for i in range(2, pm//2 + 1):
    if (pm % i == 0):
        print("Number is not prime")
        break
else:
    print("Number is prime")



#Working with Arrays
#In arrays all entries should be of same type
#Unlike other languages arrays in python does not have fixed size

from array import * #Other way is given below
#import array as arr
#If you define as 'i' then it will not take float or double
#i size is 2, float size is 4 and double size is 8
#Can you for loop similar to list
#Using only arrays, you will not be able to use multidimensional arrays. Use numpy
vals = array('d', [2.5, 3, 4.5] )
print(vals.buffer_info())
vals.reverse()
for i in range(len(vals)):
    print(vals[i])

#array('u', ['a', 'e', 'i'])  -- This is for characters

#When you want to copy a array or squares
newArray = array(vals.typecode, (a * a for a in vals))
newArray.append(5.0)
print(newArray)

#To find an element
print(newArray.index(5.0))


#Using numpy -- Install it
import numpy as np
arrnp = np.array([1,2,3]) #All numbers gets converted to float by default
arrnp1 = np.array([1,2,3], float)
print(arrnp.dtype)
#There is other linspace, longspace, arange, zeros, ones methods in numpy to create arrays using numpy

arrnp1 += 5 #Adds to all variables

arrnp3 = arrnp1 + arrnp #This is called vectorised operations
print (arrnp3)

#you can do sin(arrnp), cos(arrnp), log(arrnp), sqrt(arrnp), sum(arrnp), min(arrnp)
#You can sort, max, concatinate
print(np.concatenate([arrnp, arrnp3]))

#For arrays also if there are 2 arrays with same values, they point to same address
#for copying an array
cparr = arrnp.view() #For shallow copy. But still addresses will be different
cparr2 = arrnp.copy() #For deep copy


#Matrixes in numpy
mparr = np.array([[1,2,3, 6, 2, 5], [4,5,6, 7, 5, 3]])
print('Hi', mparr.ndim)
print(mparr.shape)
print(mparr.size)

nwmp = mparr.flatten()
#nwmp2 = nwmp.reshape(3,4) #For one single output
nwmp2 = nwmp.reshape(2,2,3) #This gives 2 2 dimensional arrays
print(nwmp2)

m = np.matrix(mparr)
m1 = np.matrix('1 2 3 6; 4 5 6 7')
print(np.diagonal(m))
print(m.min())

#m2 = m1 * m1
#Similarly you can add also


"""
This is for documentation. Not for comments

"""
#Functions

def addsum (a, b):
    sum = a + b
    diff = a - b
    return sum, diff

res1, res2 = addsum (3, 4)

print("res1 and 2", res1, res2)

#Pass by reference and pass by value

def update(x):
    x = 8
    print(x)

a = 10
update(a)
print(a)

#Here value of a does not change. X (Anything immutable) will initially have address of a only but when you update it
#It will get assigned with new address
#So not pass by value or reference

#But for list (i.e for mutable things) - pass by reference mostly


#Types of arguments
#Formal arguments, Actual arguments
#Actual arguments have 4 types - Position, keyword, default, variable length
#Position is as per position it will assign
#keyword : eg - addex (a = 5, b = (1, 2))
#variable length also has keyword variable length

def addex (a, * b):
    sum = a
    for i in b: #Here b will be a tuple
        sum += i

    print(sum)

print("Add output", addex(2, 5, 6, 7))

def  check (**b):
    for i, j in b.items():
        print(i, j)

check(a='babu')



#global variables
#Scope - local, global

#globals()['a'] = 1 -- If a is there in both global and local scope
a = 10
g = 11
def scp ():
    a = 5 #This a's scope is local. The movement you try to change it will be local variable
    #If you want to use global a, even while changing 
    #global a --- Add this before a = 5
    #But if you do like this then you cannot have both global and local a's at a time.
    #For that use global()['a'] -- no need to write 'global a' 
    if (g > 5): #We can access global variables inside the function as well. If no collision

        pass
    b = 5

scp()
print(a) #print 10 and not 5


#Recursion
#Factorial 

def fact (n):
    if n == 0:
        return 1
    return n * fact(n-1)

print("Factorial of a number is", fact(5))

#Nth Fibonaci
#Can you fibbonaci in an iterative way

def fib (n):
    if n == 0 or n == 1:
        return n
    return fib (n - 1) + fib (n - 2)

print("fib is: {}".format(fib(8)))

#Anonymous functions or lambda's
greet = lambda a: a * a
greet2 = lambda i, j : i + j
print("Lambda function output is", greet(9))


#Filter, map and reduce
#All these 3 things takes 2 things - First one a function and 2nd a sequence
nums = [1, 2, 3, 4, 5, 6, 7]
evens = list(filter (lambda b: b%2 == 0, nums)) #You will get a sequence. You have to convert it into list
print(evens)

mapex = list(map(lambda b: b ** 2, nums))
print(mapex)

from functools import reduce
redex = reduce(lambda a, b: a * b, nums)
print(redex)

#Some algorithms
#Swap 2 numbers - Use temp, addition method, xor method and one line code (This uses stack. System will solve right side of equation first)
#Searching - linear and binary

pos = -1
def search (list, n):
    i = 0
    while (i < len(list)):
        if list[i] == n:
            globals()['pos'] = i
            print("found")
            return True
        i += 1
    return False

list = [5, 8, 4, 6, 9, 2]
n = 9

if (search(list, n)):
    print("Found at", pos)
else:
    print("Not Found")


#Binary search
def search (list, n):
    low = 0
    high = len(list)-1
    
    while (low <= high):
        mid = (low + high) // 2
        if list[mid] == n:
            return True
        elif list[mid] > n:
            high = mid - 1
        else:
            low = mid + 1
    return False


#Complete this later
print("From here bubble sort")
list = [5, 1, 2 , 2.2, 99, -11]
def bsort(list):
    for i in range(0, len(list)):
        for j in range (0, len(list)-i-1):
            if list[j] > list[j+1]:
                temp = list[j]
                list[j] = list[j+1]
                list[j] = temp


bsort(list)

print(list)



#Modules in Python
#from calc import * //You will get all functions in calc

print(__name__) #This will either give __main__ or calc as output
#All print statements will executed if just say import calc

#__main__ is the starting point of execution
#There can be statements or functions which you want to run only if the py file is first file.
#In such cases this can be used.
if __name__ == '__main__':
    pass




#OOPS in Python
#Python supports all types of programming - OOP, Procedural and also functional
#Attributes and Behaviour i.e variables and methods
#class is design and object is design
#Objects are stored in heaps
#All objects even if they have same variables it will be given new address
#Types of varibales - Instance variable and Class or Static varibale
#Types of methods - instance, class and static
#static - Does not deal with any class variables or instance
#Setters and getters are called accessors and mutators

class Student:
    totalStudent = 0
    def __init__(self, a , b):
        self.rollNo = a
        self.name = b 
        print("This is constructor")

    def newmeth(self):
        self.totalStudent = 5 #This is not static variables I guess
        print(self.totalStudent) #This is working
        print(self.rollNo, self.name)
        print("Just checking the method")

    def compare(self, other):
        if self.rollNo == other.rollNo:
            return True
        else:
            print("Not equal")
            return False
    
    def __add__(self, other): #You just have to know which method to override
        return self.rollNo + other.rollNo

    
    @classmethod
    def info (cls): #It should be cls only. Not anyother
        cls.totalStudent *= cls.totalStudent


    @staticmethod
    def example(): #Dont pass self or cls here
        print("This is just")


s1 = Student(28, 'Ajay')
print(type(s1)) #Gives output as object student
s1.newmeth()

s1.compare(Student(29, 'Babu'))
print(Student.totalStudent)
Student.totalStudent = 4
#Can s1.totalStudent = 2 change the static?


#Both static methods and class methods can be called using instance names
s1.example()
s1.info() 
print(Student.totalStudent)



#Try creating an inner class


#Multilevel Inheritance and MultipleInheritence
#Child class and sub class
#class Student(Human, livingBeing):


#Constructors in Inheritance, MRO
#If there is constructor in child class then only that constructor will run
#Constructor of parent class will not run
#You have to call it if you want to by using super().__init__()


#Polymorphism
#Duck typing, Operator overloading, Method overloading, Method overriding
#Duck typing give example of compare function in above class
#Method overloading not allowed. Either use Nones or variable parameters
#def __add__(self, other):


#Error types - Compile type, syntax error, Logical error

a = 2
b = 0

try:
    print(a/b)
except ZeroDivisionError as e:
    pass
except ValueError as ve:
    pass
except Exception as e: #Exception (Capital E only - Maybe because it class)
    print(e)
finally:
    print("Ended")



#Decorators
def div (a,b):
    print(a/b)

#Now even if i send div(2, 4) I should get div(4,2)
#We can use decorators in this case
def smart_div (func):
    def inner (a,b):
        if a < b:
            a, b = b, a
        return func(a, b)
    return inner


div = smart_div(div)
div(2,4)



#Iterators
#For loop also uses iterator
#It will have 2 functions iter, next

nums = [7, 8, 9, 5]
it = iter(nums)
print(it.__next__())
print(it.__next__())
print(it.__next__()) # Or next(it)
#You can create your own 

class newIter:
    def __init__(self):
        self.num = 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.num <= 10:
            val = self.num
            self.num += 1
            return val
        else:
            raise StopIteration #For loop will handle this exception

values = newIter()


#Generators
#Iterators with simple implementation
#Generator loads once after another. Increases memory


def topten ():
    n  = 1
    while n <= 10:
        sq = n * n
        yield sq
        n += 1

values = topten()
print (values) #Values here is a iterator basically
print(values.__next__())



