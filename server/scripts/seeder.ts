import mongoose from "mongoose";
import Problems, {ProblemsAttrs, Level} from "../src/models/problems";
import {Topics} from "../src/models/topics";
import logger from "../src/utils/logger";
import { CustomError } from "../src/utils/error";

const problems: ProblemsAttrs[] = [
    {
        name: "Kadane's Algorithm",
        level: Level.Easy,
        article: '',
        statement: `Given an integer array arr, find the contiguous subarray (containing at least one number) which has the largest sum and returns its sum.`,
        leetcode: 'https://leetcode.com/problems/maximum-subarray/',
        topic: Topics.Array,
        youtube: 'https://www.youtube.com/embed/AHZpyENo7k4' // Striver
    },
    {
        name: "Next Permutation",
        level: Level.Medium,
        article: '',
        statement: `Given an array of integers, rearrange it into the lexicographically next greater permutation of numbers. If not possible, rearrange as ascending order.`,
        leetcode: 'https://leetcode.com/problems/next-permutation/',
        topic: Topics.Array,
        youtube: 'https://www.youtube.com/embed/LuLCLgMElus' // Striver
    },
    {
        name: "Merge Overlapping Intervals",
        level: Level.Medium,
        article: '',
        statement: `Given an array of intervals, merge all the overlapping intervals.`,
        leetcode: 'https://leetcode.com/problems/merge-intervals/',
        topic: Topics.Array,
        youtube: 'https://www.youtube.com/embed/2JzRBPFYbKE' // Striver
    },
    {
        name: "Reverse a Linked List",
        level: Level.Easy,
        article: '',
        statement: `Given the head of a singly linked list, reverse the list and return its head.`,
        leetcode: 'https://leetcode.com/problems/reverse-linked-list/',
        topic: Topics.LinkedList,
        youtube: 'https://www.youtube.com/embed/G0_I-ZF0S38' // Striver
    },
    {
        name: "Detect Cycle in Linked List",
        level: Level.Medium,
        article: '',
        statement: `Given a linked list, determine if it has a cycle in it.`,
        leetcode: 'https://leetcode.com/problems/linked-list-cycle/',
        topic: Topics.LinkedList,
        youtube: 'https://www.youtube.com/embed/6EtLgHcdx54' // Striver
    },
    {
        name: "Reverse Linked List in Groups of Size K",
        level: Level.Hard,
        article: '',
        statement: `Given the head of a singly linked list of \`n\` nodes and an integer \`k\`, where \`k\` is less than or equal to \`n\`. Your task is to reverse the order of each group of \`k\` consecutive nodes. If \`n\` is not divisible by \`k\`, then the last group of remaining nodes should remain unchanged.`,
        leetcode: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
        topic: Topics.LinkedList,
        youtube: 'https://www.youtube.com/embed/Of0HPkk3JgI' // Striver - Reverse Linked List in k-Groups
    },
    {
        name: "Valid Parentheses (Stack)",
        level: Level.Easy,
        article: '',
        statement: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
        leetcode: 'https://leetcode.com/problems/valid-parentheses/',
        topic: Topics.Stack,
        youtube: 'https://www.youtube.com/embed/wkDfsKijrZ8' // Striver
    },
    {
    name: "Assign Cookies",
    level: Level.Easy,
    article: '',
    statement: `Assume you are an awesome parent and want to give your children some cookies. Each child has a greed factor, and each cookie has a size. You want to assign cookies to children such that each child gets a cookie with size >= their greed factor. Return the maximum number of children that can be satisfied.`,
    leetcode: 'https://leetcode.com/problems/assign-cookies/',
    topic: Topics.Greedy,
    youtube: 'https://www.youtube.com/embed/Q2XjFzIwu-Q' // CodeHelp
    },
    {
        name: "Jump Game II",
        level: Level.Medium,
        article: '',
        statement: `Given an array of non-negative integers nums, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position. Your goal is to reach the last index in the minimum number of jumps.`,
        leetcode: 'https://leetcode.com/problems/jump-game-ii/',
        topic: Topics.Greedy,
        youtube: 'https://www.youtube.com/embed/Yrw3GdqFN2g' // Striver
    },
    {
        name: "Minimum Number of Platforms",
        level: Level.Hard,
        article: '',
        statement: `Given arrival and departure times of trains at a station, find the minimum number of platforms required so that no train waits.`,
        leetcode: 'https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1',
        topic: Topics.Greedy,
        youtube: 'https://www.youtube.com/embed/dxVcMDI7vyI' // Striver
    },
    {
        name: "Factorial of a Number",
        level: Level.Easy,
        article: '',
        statement: `Given a positive integer \`n\`, return the factorial of \`n\` using recursion.`,
        leetcode: '', // Common recursion example, no specific LeetCode link
        topic: Topics.Recursion,
        youtube: 'https://www.youtube.com/embed/uy8rA6d_6bM' // CodeHelp
    },
    {
        name: "Subset Sum",
        level: Level.Medium,
        article: '',
        statement: `Given an array of integers and a target sum, determine if there is a subset of the array that sums to the target using recursion.`,
        leetcode: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        topic: Topics.Recursion,
        youtube: 'https://www.youtube.com/embed/fWX9xDmIzRI' // Striver
    },
    {
        name: "N-Queens Problem",
        level: Level.Hard,
        article: '',
        statement: `The N-Queens problem is to place \`n\` chess queens on an \`n×n\` chessboard so that no two queens threaten each other. Find all distinct solutions to the n-queens puzzle using recursion and backtracking.`,
        leetcode: 'https://leetcode.com/problems/n-queens/',
        topic: Topics.Recursion,
        youtube: 'https://www.youtube.com/embed/i05Ju7AftcM' // Striver
    },
    {
        name: "Binary Search",
        level: Level.Easy,
        article: '',
        statement: `Given a sorted array of integers and a target value, return the index of the target if it is present in the array. If not, return -1.`,
        leetcode: 'https://leetcode.com/problems/binary-search/',
        topic: Topics.BinarySearch,
        youtube: 'https://www.youtube.com/embed/sz8HWBLoYVk' // Striver
    },
    {
        name: "Search in Rotated Sorted Array",
        level: Level.Medium,
        article: '',
        statement: `Given a rotated sorted array of distinct integers and a target value, return its index if found in the array. Otherwise, return -1.`,
        leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        topic: Topics.BinarySearch,
        youtube: 'https://www.youtube.com/embed/5qGrJbHhqFs' // Striver
    },
    {
        name: "Median of Two Sorted Arrays",
        level: Level.Hard,
        article: '',
        statement: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.`,
        leetcode: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
        topic: Topics.BinarySearch,
        youtube: 'https://www.youtube.com/embed/LPFhl65R7ww' // Striver
    },
    {
        name: "Valid Palindrome",
        level: Level.Easy,
        article: '',
        statement: `Given a string \`s\`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.`,
        leetcode: 'https://leetcode.com/problems/valid-palindrome/',
        topic: Topics.String,
        youtube: 'https://www.youtube.com/embed/sZosU8JjVaI' // Striver
    },
    {
        name: "Longest Substring Without Repeating Characters",
        level: Level.Medium,
        article: '',
        statement: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
        leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        topic: Topics.String,
        youtube: 'https://www.youtube.com/embed/wiGpQwVHdE0' // Striver
    },
    {
        name: "Wildcard Matching",
        level: Level.Hard,
        article: '',
        statement: `Given an input string \`s\` and a pattern \`p\`, implement wildcard pattern matching with support for \`?\` and \`*\`.\n- '\`?\`' Matches any single character.\n- '\`*\`' Matches any sequence of characters (including the empty sequence).\nThe matching should cover the entire input string (not partial).`,
        leetcode: 'https://leetcode.com/problems/wildcard-matching/',
        topic: Topics.String,
        youtube: 'https://www.youtube.com/embed/ZmlQ3vgAOMo' // Striver
    },
    {
        name: "Kth Largest Element in a Stream",
        level: Level.Easy,
        article: '',
        statement: `Design a class to find the \`k\`th largest element in a stream of integers. The class should have a method that adds a new integer from the stream and returns the \`k\`th largest element.`,
        leetcode: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
        topic: Topics.Heap,
        youtube: 'https://www.youtube.com/embed/wptevk0bshY' // CodeHelp
    },
    {
        name: "Top K Frequent Elements",
        level: Level.Medium,
        article: '',
        statement: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You must solve it in better than O(n log n) time complexity.`,
        leetcode: 'https://leetcode.com/problems/top-k-frequent-elements/',
        topic: Topics.Heap,
        youtube: 'https://www.youtube.com/embed/YPTqKIgVk-k' // Striver
    },
    {
        name: "Merge K Sorted Lists",
        level: Level.Hard,
        article: '',
        statement: `You are given an array of \`k\` linked-lists \`lists\), each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.`,
        leetcode: 'https://leetcode.com/problems/merge-k-sorted-lists/',
        topic: Topics.Heap,
        youtube: 'https://www.youtube.com/embed/ptYUCjfNhJY' // Striver
    },
    {
        name: "Fibonacci Number",
        level: Level.Easy,
        article: '',
        statement: `The Fibonacci numbers, commonly denoted \`F(n)\` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.\nImplement it using Dynamic Programming (Memoization or Tabulation).`,
        leetcode: 'https://leetcode.com/problems/fibonacci-number/',
        topic: Topics.DynamicProgramming,
        youtube: 'https://www.youtube.com/embed/tyB0ztf0DNY' // Striver
    },
    {
        name: "Longest Palindromic Subsequence",
        level: Level.Medium,
        article: '',
        statement: `Given a string \`s\`, find the length of its longest palindromic subsequence.`,
        leetcode: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
        topic: Topics.DynamicProgramming,
        youtube: 'https://www.youtube.com/embed/6i_T5kkfv4A' // Striver
    },
    {
        name: "Edit Distance",
        level: Level.Hard,
        article: '',
        statement: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`. You have the following 3 operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character`,
        leetcode: 'https://leetcode.com/problems/edit-distance/',
        topic: Topics.DynamicProgramming,
        youtube: 'https://www.youtube.com/embed/fJaKO8FbDdo' // Striver
    },
    {
        name: "Flood Fill",
        level: Level.Easy,
        article: '',
        statement: `An image is represented by a 2D array of integers, where each integer represents the pixel value. Implement a flood fill algorithm starting from a given pixel (sr, sc) and change the color of connected pixels having the same initial color.`,
        leetcode: 'https://leetcode.com/problems/flood-fill/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/C-2_uSRli8o' // Striver
    },
    {
        name: "Number of Enclaves",
        level: Level.Medium,
        article: '',
        statement: `Given a 2D binary matrix \`grid\` of 0s (water) and 1s (land), return the number of land cells from which we cannot walk off the boundary of the grid.`,
        leetcode: 'https://leetcode.com/problems/number-of-enclaves/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/rxKcepXQgU4' // Striver
    },
    {
        name: "Alien Dictionary",
        level: Level.Hard,
        article: '',
        statement: `Given a sorted dictionary of an alien language, find the order of characters in the language. The input consists of a list of words sorted lexicographically in the alien language.`,
        leetcode: 'https://leetcode.com/problems/alien-dictionary/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/U3N_je7tWAs' // Striver
    },
    {
        name: "Maximum Depth of Binary Tree",
        level: Level.Easy,
        article: '',
        statement: `Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
        leetcode: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        topic: Topics.Tree,
        youtube: 'https://www.youtube.com/embed/hTM3phVI6YQ' // Striver
    },
    {
        name: "Diameter of Binary Tree",
        level: Level.Medium,
        article: '',
        statement: `Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.`,
        leetcode: 'https://leetcode.com/problems/diameter-of-binary-tree/',
        topic: Topics.Tree,
        youtube: 'https://www.youtube.com/embed/Rezetez59Nk' // Striver
    },
    {
        name: "Binary Tree Maximum Path Sum",
        level: Level.Hard,
        article: '',
        statement: `Given the root of a binary tree, return the maximum path sum of any path. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections (not necessarily passing through the root).`,
        leetcode: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
        topic: Topics.Tree,
        youtube: 'https://www.youtube.com/embed/WszrfSwMz58' // Striver
    },
    {
        name: "Find the Town Judge",
        level: Level.Easy,
        article: '',
        statement: `In a town of \`n\` people, a judge is a person who is trusted by everyone else but trusts nobody. Given an array of trust relationships, return the label of the town judge or \`-1\` if none exists.`,
        leetcode: 'https://leetcode.com/problems/find-the-town-judge/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/-REjjgq3OmI' // Striver
    },
    {
        name: "Rotting Oranges",
        level: Level.Medium,
        article: '',
        statement: `Given a 2D grid where each cell represents a fresh orange, rotten orange, or empty cell, find the minimum number of minutes required for all fresh oranges to become rotten. Return \`-1\` if impossible.`,
        leetcode: 'https://leetcode.com/problems/rotting-oranges/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/y704fEOx0s0' // Striver
    },
    {
        name: "Swim in Rising Water",
        level: Level.Hard,
        article: '',
        statement: `Given an \`n x n\` integer matrix representing elevations, you start at the top-left and want to reach the bottom-right. At time \`t\`, you can enter positions with elevations \`<= t\`. Find the minimum time \`t\` required to swim across.`,
        leetcode: 'https://leetcode.com/problems/swim-in-rising-water/',
        topic: Topics.Graph,
        youtube: 'https://www.youtube.com/embed/m2rPc4dQ6U4' // Striver
    },
    {
        name: "Implement Trie (Prefix Tree)",
        level: Level.Easy,
        article: '',
        statement: `Implement a trie with \`insert\`, \`search\`, and \`startsWith\` methods.`,
        leetcode: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        topic: Topics.Trie,
        youtube: 'https://www.youtube.com/embed/T0DqDqOx3PY' // Striver
    },
    {
        name: "Replace Words",
        level: Level.Medium,
        article: '',
        statement: `Given a dictionary of roots and a sentence, replace all words in the sentence that have the root as a prefix with the root itself. Return the modified sentence.`,
        leetcode: 'https://leetcode.com/problems/replace-words/',
        topic: Topics.Trie,
        youtube: 'https://www.youtube.com/embed/q_LBmFHeG5Q' // Striver
    },
    {
        name: "Palindrome Pairs",
        level: Level.Hard,
        article: '',
        statement: `Given a list of unique words, return all the pairs of distinct indices \`(i, j)\` such that the concatenation of \`words[i] + words[j]\` is a palindrome.`,
        leetcode: 'https://leetcode.com/problems/palindrome-pairs/',
        topic: Topics.Trie,
        youtube: 'https://www.youtube.com/embed/KYH83T4q6Vs' // Striver
    }
];

let insert = async () =>{
    try{
    let mongoDbUrl: string = process.env.MONGODB_URL??'';
    await mongoose.connect(mongoDbUrl);
    logger.info(`Mongoose connected:, ${mongoose.connection.readyState}`);
    let promiseList = [];
    for(let i=0;i<problems.length;i++){
        let problem = Problems.build(problems[i]);
        promiseList.push(problem.save());
    }
    await Promise.all(promiseList)
    console.log('inserted');
    }
    catch(err){
        console.error(err);
        throw new CustomError(500, JSON.stringify(err));
    }
}

insert().then(()=>{
    console.log('started');
    process.exit(1);
})